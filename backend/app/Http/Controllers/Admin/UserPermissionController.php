<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Resources\UserDataPermissionsAndRoles;
use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserPermissionController extends APIController
{
    public function show(string $userId)
    {
        try {
            $user = User::find($userId);
            
            if(!$user) throw new ModelNotFoundException('Erro ao buscar o usuário.');

            return $this->sendResponse(
                UserDataPermissionsAndRoles::make($user),
                'Dados de permissões do usuário recuperados com sucesso.',
                Response::HTTP_OK
            );
        } catch (ModelNotFoundException $e) {
            if(!$user)
                return $this->sendError($e->getMessage(), ['Usuário não encontrado nos registros']);
        }
    }

     /**
     * Update the specified user's permissions and roles.
     */
    public function update(Request $request, User $user)
    {
    //     $request->validate([
    //         'global_roles' => 'nullable|array',
    //         'global_roles.*' => ['string', Rule::exists('roles', 'name')], // Valida que os nomes de cargo existem
    //         'global_permissions' => 'nullable|array',
    //         'global_permissions.*' => ['string', Rule::exists('permissions', 'name')], // Valida que os nomes de permissão existem
    //         'edital_roles' => 'nullable|array',
    //         'edital_roles.*.*' => ['string', Rule::exists('roles', 'name')],
    //         'edital_permissions' => 'nullable|array', // Estas são as 'direct_permissions'
    //         'edital_permissions.*.*' => ['string', Rule::exists('permissions', 'name')],
    //     ]);

    //     DB::beginTransaction();
    //     try {
    //         // 1. Sincronizar Cargos Globais
    //         $user->syncRoles($request->input('global_roles', []));

    //         // 2. Sincronizar Permissões Globais Diretas
    //         $user->syncPermissions($request->input('global_permissions', []));

    //         // 3. Sincronizar Cargos por Edital
    //         // Limpa e reinsere para garantir que o estado do DB reflita o do frontend
    //         DB::table('model_has_roles_by_edital')->where('user_id', $user->uuid)->delete();
    //         if ($request->has('edital_roles')) {
    //             foreach ($request->input('edital_roles') as $editalId => $roleNames) {
    //                 foreach ($roleNames as $roleName) {
    //                     $user->assignRoleForEdital($roleName, (int)$editalId); // Cast para int, pois editalId vem como string da chave JSON
    //                 }
    //             }
    //         }

    //         // 4. Sincronizar Permissões Diretas por Edital
    //         DB::table('model_has_permissions_by_edital')->where('user_id', $user->uuid)->delete();
    //         if ($request->has('edital_permissions')) {
    //             foreach ($request->input('edital_permissions') as $editalId => $permissionNames) {
    //                 foreach ($permissionNames as $permissionName) {
    //                     $user->givePermissionToForEdital($permissionName, (int)$editalId);
    //                 }
    //             }
    //         }

    //         DB::commit();
    //         return response()->json(['success' => true, 'message' => 'Permissões e cargos atualizados com sucesso.'], 200);

    //     } catch (\Exception $e) {
    //         DB::rollBack();
    //         report($e); // Registra o erro
            return $this->sendError('Não implementado ainda', [0 => 'Ainda não foi implementado'], Response::HTTP_NOT_IMPLEMENTED);
    //     }
    }
}
