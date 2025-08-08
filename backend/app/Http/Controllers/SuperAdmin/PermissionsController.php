<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Resources\Admin\PermissionCollection;
use App\Http\Resources\Admin\PermissionResource;
use App\Models\Permission;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Symfony\Component\HttpFoundation\Response;

class PermissionsController extends __SuperAdminController
{
    public function __construct(){
        parent::__construct();
    }
    public function indexGlobal(){
        return $this->index(Permission::where("scope", 'global')->get());
    }
    public function indexLocal(){

        return $this->index(Permission::where("scope", 'local')->get());
    }
    /**
     * Display a listing of the permissions.
     */
    public function index(Collection $permissions = null)
    {
        try {
            return $this->sendResponse(
                PermissionCollection::make($permissions ?? Permission::all()),
                "Permissões enviadas com sucesso."
            );
        } catch (Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Display the specified permission.
     */
    public function show(Permission $permission)
    {
        try {
            return $this->sendResponse(
                PermissionResource::make($permission),
                "Permissão enviada com sucesso."
            );
        } catch (Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
