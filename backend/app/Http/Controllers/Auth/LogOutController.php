<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\APIController;
use App\Services\Auth\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LogOutController extends APIController
{
    public function __construct(protected AuthService $authService)
    {
        $this->middleware('auth:sanctum');
    }

    public function logout(Request $request)
    {
        try{
            $this->authService->logoutUser($request->user());
            return $this->sendResponse([], 'Logout efetuado com sucesso.', Response::HTTP_OK);
        } catch (\Exception $e) {
            return $this->sendError($e->getMessage(), [], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
