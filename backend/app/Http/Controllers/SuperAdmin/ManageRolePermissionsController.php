<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Exceptions\DifferentScopeException;
use App\Http\Controllers\SuperAdmin\__SuperAdminController;
use App\Http\Requests\SyncRolePermissionsRequest;
use App\Http\Resources\Admin\RelatedRolePermissionsCollection;
use App\Http\Resources\Admin\RelatedRolePermissionsResource;
use App\Interfaces\Admin\SyncRolePermissions\ISyncRolePermissionsService;
use App\Models\Role;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpFoundation\Response;

class ManageRolePermissionsController extends __SuperAdminController
{
    public function __construct(protected ISyncRolePermissionsService $rolePermissionService){
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
                RelatedRolePermissionsCollection::make($permissions ?? Role::all()),
                "Cargos com suas relações de permissões foram enviados com sucesso."
            );
        } catch (\Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(Role $role){
        try{
            return $this->sendResponse(
                RelatedRolePermissionsResource::make($role),
                "Permissões atreladas ao cargo '".$role->name."' recebidas com sucesso."
            );
        }
        catch (\Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
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
