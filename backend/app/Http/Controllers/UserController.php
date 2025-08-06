<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\UpdateProfileRequest;
use Symfony\Component\HttpFoundation\Response;
use App\Interfaces\User\IUserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserController extends APIController
{
    public function __construct(protected IUserService $iUserService){
    }
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();

        $this->authorize('view', $user);

        try {
            $result = $this->iUserService->getProfileData($user);
            return $this->sendResponse($result, "Dados do usuário obtidos com sucesso.");
        } catch (\Exception $e) {
            return $this->sendError('Erro inesperado',[0 => $e->getMessage() ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $user = $request->user();

        $this->authorize('update', $user);

        try {
            $result = $this->iUserService->updateProfile($user, $request->validated());
            return $this->sendResponse($result, "Dados cadastrais atualizados com sucesso");
        } catch (\Exception $e) {
            return $this->sendError('Erro inesperado',[0 => $e->getMessage() ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function getPermissions(Request $request): JsonResponse
    {
        try {
            $result = $this->iUserService->getUserPermissions($request->user());
            return $this->sendResponse($result, 'Permissões do usuário recebidas com sucesso.');
        } catch (\Exception $e) {
            return $this->sendError('Erro inesperado',[0 => $e->getMessage() ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
