<?php

namespace App\Http\Controllers;
use App\Http\Resources\UserDataPermissionsAndRoles;
use Symfony\Component\HttpFoundation\Response;
use App\Http\Controllers\API\ApiBaseController;
use Illuminate\Http\Request;

class UserPermissionController extends ApiBaseController
{
    public function userPermissions(Request $request)
    {
        return $this->sendResponse(
            UserDataPermissionsAndRoles::make($request->user()),
            'User permissions retrieved successfully.',
            Response::HTTP_OK
        );
    }
}
