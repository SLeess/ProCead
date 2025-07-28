<?php

namespace App\Policies;

use App\Models\Edital;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EditalPolicy
{
    use HandlesAuthorization;

    /**
     * Perform pre-authorization checks.
     *
     * @param  \App\Models\User  $user
     * @param  string  $ability
     * @return void|bool
     */
    public function before(User $user, $ability)
    {
        // Grant all permissions to a Super Admin
        if ($user->hasRole('Super-Admin', 'global')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the admin dashboard for the edital.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Edital  $edital
     * @return bool
     */
    public function administrar(User $user, Edital $edital)
    {
        return $user->hasPermissionTo("administrar-edital:{$edital->id}", 'local');
    }

    /**
     * Determine whether the user can apply to the edital.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Edital  $edital
     * @return bool
     */
    public function inscrever(User $user, Edital $edital)
    {
        return $user->hasPermissionTo(permission: "inscrever-se-edital:{$edital->id}", guardName: 'local');
    }

    /**
     * Determine whether the user can view the candidate panel for the edital.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Edital  $edital
     * @return bool
     */
    public function demaisAtividadesCandidato(User $user, Edital $edital)
    {
        return $user->hasPermissionTo("acesso-candidato-edital:{$edital->id}", 'local');
    }
}
