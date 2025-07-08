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
        $roles = $this->getRoleNames();
        $permissions = $this->getPermissionsViaRoles()->pluck('name');

        return [
            "user" => [
                "uuid" => $this->uuid,
                "nome" => $this->nome,
                "cpf" => $this->cpf,
                "email" => $this->email,
                "created_at" => $this->created_at->format('Y-m-d H:i:s'),
                "updated_at" => $this->updated_at->format('Y-m-d H:i:s'),
            ],
            'permissions' => $permissions,
            'roles' => $roles,
        ];
    }
}
