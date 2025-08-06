<?php

namespace App\Http\Controllers\Admin;

use App\Exceptions\DifferentScopeException;
use App\Http\Controllers\API\APIController;
use App\Http\Requests\SyncRolePermissionsRequest;
use App\Interfaces\Admin\SyncRolePermissions\ISyncRolePermissionsService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpFoundation\Response;

class ManageRolePermissionsController extends APIController
{
    public function __construct(protected ISyncRolePermissionsService $rolePermissionService){
        $this->middleware('permission:visualizar-e-alterar-permissoes-do-perfil')->only('update');
    }

    public function update(SyncRolePermissionsRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $this->rolePermissionService->syncPermissionsToRole(
                $validatedData['role_id'],
                $validatedData['permissions']
            );

            return $this->sendResponse([], "Permissões do perfil atualizadas com sucesso.");
        } catch (ModelNotFoundException $e) {
            return $this->sendError("Erro na busca por uma permissão ou cargo.", [0 => $e->getMessage()], Response::HTTP_NOT_FOUND);

        } catch (DifferentScopeException $e) {
            return $this->sendError("Erro na associação entre cargos e permissões com escopos distintos.", [0 => $e->getMessage()], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (\Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
