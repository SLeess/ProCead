<?php

namespace App\Interfaces\User;

use App\Models\User;

interface IManageUserRolesAndPermissionsService{
    public function syncAllGlobalRolesAndPermissions(array $data, User $user): string;
    public function syncAllLocalRolesAndPermissions(array $data, User $user): string;
}
