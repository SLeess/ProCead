<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Resources\UserDataPermissionsAndRoles;
use App\Interfaces\User\IManageUserRolesAndPermissionsService;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\Response;

class ManageUserPermissionsController extends __SuperAdminController
{
    public function __construct(protected IManageUserRolesAndPermissionsService $iManageUserRolesAndPermissionsService){
        parent::__construct();
    }

    public function show(User $user)
    {
        return $this->sendResponse(
            UserDataPermissionsAndRoles::make($user),
            'Dados de permissões do usuário recuperados com sucesso.',
            Response::HTTP_OK
        );
    }

     /**
     * Update the specified user's permissions and roles.
     */
    public function updateGlobal(Request $request, User $user)
    {
        $data = $request->validate([
            'global_roles' => 'nullable|array',
            'global_roles.*' => ['string', Rule::exists('roles', 'id')], // Valida que os nomes de cargo existem
            'global_permissions' => 'nullable|array',
            'global_permissions.*' => ['string', Rule::exists('permissions', 'id')], // Valida que os nomes de permissão existem
            // 'edital_roles' => 'nullable|array',
            // 'edital_roles.*.*' => ['string', Rule::exists('roles', 'name')],
            // 'edital_permissions' => 'nullable|array', // Estas são as 'direct_permissions'
            // 'edital_permissions.*.*' => ['string', Rule::exists('permissions', 'name')],
        ]);

        try {

            $this->iManageUserRolesAndPermissionsService->syncAllGlobalRolesAndPermissions($data, $user);
            return response()->json(['success' => true, 'message' => 'Permissões e cargos atualizados com sucesso.'], 200);
        } catch (\Exception $e) {
            // return $this->sendError('Não implementado ainda', [0 => 'Ainda não foi implementado'], Response::HTTP_NOT_IMPLEMENTED);
        }
    }
}
