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
            'roles' => 'nullable|array',
            'roles.*' => ['string', Rule::exists('roles', 'id')], // Valida que os nomes de cargo existem
            'permissions' => 'nullable|array',
            'permissions.*' => ['string', Rule::exists('permissions', 'id')], // Valida que os nomes de permissão existem
        ]);

        $this->iManageUserRolesAndPermissionsService->syncAllGlobalRolesAndPermissions(
            data: $data,
            involved_user: $user,
            author: $request->user(),
        );
        return response()->json(['success' => true, 'message' => 'Permissões e cargos atualizados com sucesso.'], 200);
    }
    public function updateLocal(Request $request, User $user)
    {
        $data = $request->validate([
            'roles' => 'nullable|array',
            'roles.*.*' => ['string', Rule::exists('roles', 'name')],
            'permissions' => 'nullable|array', // Estas são as 'direct_permissions'
            'permissions.*.*' => ['string', Rule::exists('permissions', 'name')],
            'edital_id' => ['string', Rule::exists('editais', 'id')]
        ]);

        $this->iManageUserRolesAndPermissionsService->syncAllLocalRolesAndPermissions(
            data: $data,
            involved_user: $user,
            author: $request->user(),
        );
        return response()->json(['success' => true, 'message' => 'Permissões e cargos atualizados com sucesso.'], 200);
    }
}
