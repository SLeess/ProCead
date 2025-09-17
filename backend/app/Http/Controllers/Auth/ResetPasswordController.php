<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Interfaces\Auth\IAuthService;
use Symfony\Component\HttpFoundation\Response;

class ResetPasswordController extends APIController
{
    public function __construct(protected IAuthService $authService)
    {
        $this->middleware('guest');
    }

    public function resetPassword(ResetPasswordRequest $request){
        try {
            $result = $this->authService->resetPassword($request->validated());
            return $this->sendResponse([], $result);
        } catch (\Exception $e) {
            return $this->sendError('Erro inesperado',[0 => $e->getMessage() ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}
