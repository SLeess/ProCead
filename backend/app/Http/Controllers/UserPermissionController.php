<?php

namespace App\Http\Controllers;
use Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\API\ApiBaseController;
use Illuminate\Http\Request;

class UserPermissionController extends ApiBaseController
{
    public function userPermissions(Request $request)
    {
        // Validate the request
        // dd($request, Auth::user());
        $user = Auth::user();

        // Fetch user permissions
        $permissions = $user->getPermissionsViaRoles()->pluck('name');
        $roles = $user->getRoleNames();

        // Return the response
        return $this->sendResponse([
            "user" => [
                "uuid" => $user->uuid,
                "nome" => $user->nome,
                "cpf" => $user->cpf,
                "email" => $user->email,
                "created_at" => $user->created_at->format('Y-m-d H:i:s'),
                "updated_at" => $user->updated_at->format('Y-m-d H:i:s'),
            ],
            'permissions' => $permissions,
            'roles' => $roles,
        ], 'User permissions retrieved successfully.', Response::HTTP_OK);
    }
}
