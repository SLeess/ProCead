<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserDataPermissionsAndRoles extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = $request->user();

        $permissionsByEdital = $user->getAllRolesAndPermissionsByEdital();

        $global_roles = $user->getRoleNames();
        $global_permissions = $user->getAllPermissions();

        $specialRoles =  !$global_roles->isEmpty() ? $global_roles: null;
        $specialPermissions = !$global_permissions->isEmpty() ? $global_permissions->pluck('name') : null;

        $response = [
             "user" => [
                "uuid" => $user->uuid,
                "nome" => $user->nome,
                "cpf" => $user->cpf,
                "email" => $user->email,
                "created_at" => $user->created_at->format('Y-m-d H:i:s'),
                "updated_at" => $user->updated_at->format('Y-m-d H:i:s'),
            ],
        ];

        if(count($permissionsByEdital)){
            return array_merge($response, [
                'admin_access' => [
                    'editais' => (object) $permissionsByEdital,
                    'global_roles' => $specialRoles,
                    'global_permissions' => $specialPermissions,
                ]
            ]);
        }

        return $response;
    }
}
