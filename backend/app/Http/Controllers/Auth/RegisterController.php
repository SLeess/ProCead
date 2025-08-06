<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\RegisterRequest;
use App\Interfaces\Auth\IAuthService;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;

class RegisterController extends APIController
{
    public function __construct(protected IAuthService $authService)
    {
        $this->middleware('guest');
    }

    public function register(RegisterRequest $request)
    {
        try {
            $result = $this->authService->registerUser($request->validated());
            return $this->sendResponse($result, 'Usuário registrado com sucesso.', Response::HTTP_ACCEPTED);
        } catch (\Exception $e) {
            return $this->sendError('Erro genérico.', [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }
}
