<?php

namespace App\Models;

use App\Enums\TipoUsuario;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\Contracts\Activity;
use App\Traits\LogsModelActivity;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;
use App\Notifications\UserResetPassword;
use App\Traits\HasRolesAndPermissionsByEdital;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasFactory, Notifiable,
    HasApiTokens, HasUuids, HasRoles, HasPermissions, HasRolesAndPermissionsByEdital,
    LogsActivity, LogsModelActivity;

    protected $primaryKey = 'uuid';
    protected $keyType = 'string';
    public $incrementing = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'nome',
        'cpf',
        'email',
        'password',
    ];

    /**
     * Os atributos que devem ser anexados à forma de array/JSON do modelo.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'level_access',
        'roles_and_permissions_by_edital',
    ];

    // protected static $logAttributes = [
    //     'nome',
    //     'cpf',
    //     'email',
    //     'password',
    // ];

    // protected static $logName = 'Usuário';

    // protected static $logOnlyDirty = true;

    // protected static $submitEmptyLogs = false;


    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function booted(): void{
        static::creating(function($model){
            $model->uuid = Str::uuid();
        });
    }

    public function sendPasswordResetNotification($token)
    {
        $url = env('FRONTEND_URL') . '/recuperar-senha?token=' . $token . '&email=' . $this->email;
        $this->notify(new UserResetPassword($url));
    }


    /**
     * Lista de editais que o usuário em questão tem acesso com algum nível de perfil administrador
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<Edital, User>
     */
    public function editais()
    {
        return $this->belongsToMany(Edital::class, 'model_has_roles_by_edital', 'user_id', 'edital_id');
    }

    public function latestToken(): HasOne
    {
        return $this->hasOne(PersonalAccessToken::class, 'tokenable_id')->latestOfMany('last_used_at');
    }

    /**
     * Retorna a data do último acesso do usuário com base no token mais recente.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function lastAccessAt(): Attribute
    {
        return Attribute::make(
            // O operador "?->" (nullsafe) retorna null
            // automaticamente se o usuário não tiver nenhum token, sem causar erro.
            get: fn () => $this->latestToken?->last_used_at
        );
    }

    protected function rolesAndPermissionsByEdital(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->getAllRolesAndPermissionsByEdital(),
        );
    }

    /**
     * Define o atributo virtual 'level_access'.
     *
     * @return \Illuminate\Database\Eloquent\Casts\Attribute
     */
    protected function levelAccess(): Attribute
    {
        return Attribute::make(
            get: function ($value, array $attributes) {
                if ($this->hasRole('super-Admin')) {
                    return TipoUsuario::getDescription(TipoUsuario::ADMINISTRADOR);
                }

                if (   $this->roles()->exists()                     // Verifica se o usuário tem QUALQUER cargo global
                    || $this->permissions()->exists()               // Verifica se tem QUALQUER permissão global direta
                    || $this->rolesAndPermissionsByEdital !== []    // Verifica se o usuário tem qualquer permissão ou cargo local por edital
                ) {
                    return TipoUsuario::getDescription(TipoUsuario::MODERADOR);
                }

                return TipoUsuario::getDescription(TipoUsuario::USUARIO);
            }
        );
    }

    public function scopeSearch($query, $request)
    {
        // Lógica para a busca GLOBAL (campo "Pesquisar")
        $query->when($request->input('search'), function ($query, $searchTerm) {
            return $query->where(function ($subQuery) use ($searchTerm) {
                $subQuery->where('nome', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('email', 'LIKE', "%{$searchTerm}%")
                        ->orWhere('cpf', 'LIKE', "%{$searchTerm}%");
            });
        });

        // Lógica para os filtros ESPECÍFICOS (o array `query`)
        $query->when($request->input('query'), function ($query, $filters) {
            $query->when($filters['nome'] ?? null, function ($query, $nome) {
                return $query->where('nome', 'LIKE', "%{$nome}%");
            });
            $query->when($filters['email'] ?? null, function ($query, $email) {
                return $query->where('email', 'LIKE', "%{$email}%");
            });
            $query->when($filters['cpf'] ?? null, function ($query, $cpf) {
                return $query->where('cpf', 'LIKE', "%{$cpf}%");
            });
            $query->when($filters['level_access'] ?? null, function ($query, $levelAccess) {
                if (strcasecmp($levelAccess, TipoUsuario::getDescription(TipoUsuario::ADMINISTRADOR)) === 0) {
                    return $query->whereHas('roles', function ($q) {
                        $q->where('name', 'super-Admin');
                    });
                }

                if (strcasecmp($levelAccess, TipoUsuario::getDescription(TipoUsuario::MODERADOR)) === 0) {
                    return $query->where(function ($q) {
                        $q->whereHas('roles', fn($qr) => $qr->where('name', '!=', 'super-Admin'))
                        ->orWhereHas('permissions')
                        ->orWhereHas('editais');
                    });
                }

                if (strcasecmp($levelAccess, TipoUsuario::getDescription(TipoUsuario::USUARIO)) === 0) {
                    return $query->where(function ($q) {
                        $q->whereDoesntHave('roles')
                        ->whereDoesntHave('permissions')
                        ->whereDoesntHave('editais');
                    });
                }
            });
        });

        return $query;
    }

    public function tapActivity(Activity $activity, string $eventName)
    {
        // $activity->description = "activity.logs.message. {$eventName}";
        if ($this->isDirty('password')) {
            if ($this->isDirty('password')) {
                $properties = $activity->properties->toArray();

                if (isset($properties['attributes']) && count($properties['attributes']) === 1) {
                    unset($properties['attributes']);
                }

                if (isset($properties['old']) && count($properties['old']) === 1) {
                    unset($properties['old']);
                }


                $properties['password_changed'] = true;

                $activity->properties = collect($properties);
            }
        }
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logFillable()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('Usuário')
            ->setDescriptionForEvent(fn(string $eventName) => "O usuário '{$this->nome}' foi {$this->formatEventName($eventName)}");
    }

    /**
     * Função auxiliar para traduzir o nome do evento para português.
     */
    private function formatEventName(string $eventName): string
    {
        return match ($eventName) {
            'created' => 'criado',
            'updated' => 'atualizado',
            'deleted' => 'deletado',
            default => $eventName,
        };
    }
}
