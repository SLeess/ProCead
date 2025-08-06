<?php

namespace App\Models;

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


    public function setRolesAndPermissionsByEditais(){
        $this->attributes['roles_permissions_by_editais'] = $this->getAllRolesAndPermissionsByEdital();
    }
}
