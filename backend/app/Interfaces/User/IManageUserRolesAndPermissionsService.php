<?php

namespace App\Interfaces\User;

use App\Models\User;

interface IManageUserRolesAndPermissionsService{
    public function syncAllRolesAndPermissions(array $data, User $user): string;
}
