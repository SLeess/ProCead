<?php

namespace App\Models;

use App\Enums\TipoUsuario;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;
use App\Notifications\UserResetPassword;
use App\Traits\HasRolesAndPermissionsByEdital;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\HasOne;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens, HasUuids, HasRoles, HasPermissions, HasRolesAndPermissionsByEdital;

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
        // return $query->when($request->nome, function($query, $nome){
        //     return $query->where('nome', 'like', '%'.$nome.'%');
        // });
        return $query->when($request->search, function($query, $searchTerm) {
            return $query->where('nome', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('email', 'LIKE', "%{$searchTerm}%")
                    ->orWhere('cpf', 'LIKE', "%{$searchTerm}%");
        });
    }
}
