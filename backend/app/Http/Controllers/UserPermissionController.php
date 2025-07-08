<?php

namespace App\Http\Controllers;
use App\Http\Resources\UserDataPermissionsAndRoles;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\API\APIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserPermissionController extends APIController
{
    public function userPermissions(Request $request)
    {
        dd($request->user(), Auth::user());
        return $this->sendResponse(
            UserDataPermissionsAndRoles::make($request->user()),
            'User permissions retrieved successfully.',
            Response::HTTP_OK
        );
    }
}
