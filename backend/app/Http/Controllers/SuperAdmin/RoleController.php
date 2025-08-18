<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Resources\Admin\RoleCollection;
use App\Interfaces\Admin\RoleService\IRoleService;
use App\Models\Role;
use Illuminate\Auth\Access\AuthorizationException;
use Symfony\Component\HttpFoundation\Response;

class RoleController extends __SuperAdminController
{
    public function __construct(protected IRoleService $roleService){
        parent::__construct();
    }

    public function index(){
        try {
            return $this->sendResponse(
                RoleCollection::make(Role::all()),
                "Cargos enviados com sucesso."
            );
        } catch (\Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(\App\Http\Requests\StoreRoleRequest $request)
    {
        $roleData = $request->validated();

        try {
            $this->roleService->createRole($roleData);
            return $this->sendResponse([], "Cargo registrado com sucesso!");
        } catch (\Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function update(\App\Http\Requests\UpdateRoleRequest $request)
    {
        $roleData = $request->validated();

        try {
            $this->roleService->updateRoleAndSyncPermissions($roleData['id'], $roleData);
            return $this->sendResponse([], "Cargo atualizado com sucesso!");
        } catch (\Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy(Role $role)
    {
        try {
            $this->roleService->destroyRole($role);
            return $this->sendResponse([], "Cargo deletado com sucesso!");
        } catch (AuthorizationException $e){
            return $this->sendError($e->getMessage(), [0 => $e->getMessage()], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
