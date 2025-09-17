<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Resources\Admin\RoleCollection;
use App\Interfaces\Admin\RoleService\IRoleService;
use App\Models\Role;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpFoundation\Response;

class RoleController extends __SuperAdminController
{
    public function __construct(protected IRoleService $roleService){
        parent::__construct();
    }
    public function indexGlobal(){
        return $this->index(Role::where("scope", 'global')->get());
    }
    public function indexLocal(){
        return $this->index(Role::where("scope", 'local')->get());
    }

    public function index(Collection $permissions = null){
        try {
            return $this->sendResponse(
                RoleCollection::make($permissions ?? Role::all()),
                "Cargos enviados com sucesso."
            );
        } catch (\Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function store(\App\Http\Requests\SuperAdmin\StoreRoleRequest $request)
    {
        $roleData = $request->validated();

        try {
            $this->roleService->createRole($roleData);
            return $this->sendResponse([], "Cargo registrado com sucesso!");
        } catch (\Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    public function update(\App\Http\Requests\SuperAdmin\UpdateRoleRequest $request)
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
