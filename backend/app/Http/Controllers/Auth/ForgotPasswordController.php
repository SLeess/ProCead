<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Interfaces\Auth\IAuthService;
use Symfony\Component\HttpFoundation\Response;

class ForgotPasswordController extends APIController
{
    public function __construct(protected IAuthService $authService)
    {
        $this->middleware('guest');
    }

    public function sendResetLinkEmail(ForgotPasswordRequest $request){
        try {
            $result = $this->authService->sendResetLinkEmail($request->validated());
            return $this->sendResponse($result, 'Link de reset enviado com sucesso.');
        } catch (\Exception $e) {
            return $this->sendError('Erro inesperado',[0 => $e->getMessage() ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}
