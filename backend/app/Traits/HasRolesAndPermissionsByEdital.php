<?php

namespace App\Traits;

use App\Models\Edital;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

trait HasRolesAndPermissionsByEdital
{

    public function getAllRolesAndPermissionsByEdital(): array
    {
        $rawRoleData = DB::table('model_has_roles_by_edital')->where('user_id', $this->uuid)->get();
        $rawPermissionsData = DB::table('model_has_permission_by_edital')->where('user_id', $this->uuid)->get();

        if($rawRoleData->isEmpty() && $rawPermissionsData->isEmpty()) return [];

        $rawPermissionsData = $rawPermissionsData->groupBy('edital_id');
        $rawRoleData = $rawRoleData->groupBy('edital_id');

        /**
         * Verificação mínima se há permissões ou cargos por edital para o usuário para simplificar o foreach com acesso direto de array
         */
        $min = collect($rawPermissionsData->keys())->merge($rawRoleData->keys())->unique()->values()->sort();

        return $min->mapWithKeys(function(int $edital_id) use ($rawPermissionsData, $rawRoleData){
            $roles = $rolesNames = $inherited_permissions = $direct_permissions = $effective_permissions = collect();

            if($rawRoleData->has($edital_id))
            {
                $roles = $rawRoleData[$edital_id];
                $rolesNames = $roles->map(fn($e) => Role::find($e->role_id)->name)->values();

                $inherited_permissions = $roles
                    ->flatMap(fn($e) => Role::find($e->role_id)->getAllPermissions()->pluck('name'))
                    ->unique()
                    ->values();
            }

            if($rawPermissionsData->has($edital_id)){
                $direct_permissions = $rawPermissionsData[$edital_id]
                                            ->map(fn($item)=> Permission::find($item->permission_id)->name)
                                            ->filter(fn($e) => $e !== null)
                                            ->unique();
            }

            $effective_permissions = $inherited_permissions->merge($direct_permissions)->unique();

            return [
                    $edital_id => [
                        'roles' => $rolesNames->toArray(),
                        "direct_permissions" => $direct_permissions->toArray(),
                        "inherited_permissions" => $inherited_permissions->toArray(),
                        "effective_permissions" => $effective_permissions->toArray(),
                    ]
                ];
        })->toArray();
    }

    /**
     * Check if the user has any role for any edital.
     *
     * @param string|int $roleNameOrId
     * @param int $editalId
     * @return bool
     */
    public function hasAnyRoleByEdital(): bool
    {
        return DB::table('model_has_roles_by_edital')
        ->where('user_id', $this->uuid)
        ->exists();
    }

    /**
     * Check if the user has any permission for any edital.
     *
     * @param string|int $roleNameOrId
     * @param int $editalId
     * @return bool
     */
    public function hasAnyPermissionByEdital(): bool
    {
        return DB::table('model_has_permission_by_edital')
        ->where('user_id', $this->uuid)
        ->exists();
    }

    public function dontHaveAnyPermissionOrRole(){
        return $this->getRoleNames()->isEmpty()
            && $this->getAllPermissions()->isEmpty()
            && !$this->hasAnyRoleByEdital()
            && !$this->hasAnyPermissionByEdital();
    }

    /**
     * Sincroniza os cargos de um usuário para um edital específico.
     * Remove todos os cargos existentes e os substitui pelos fornecidos.
     *
     * @param array $roles Coleção de nomes, IDs ou objetos Role.
     * @param \App\Models\Edital|int $edital
     * @return self
     */
    public function syncRolesForEdital(Collection|array $roles, $edital): self
    {
        $editalId = $edital instanceof Edital ? $edital->id : $edital;

        $rolesCollection = $roles instanceof Collection ? $roles : $this->convertToRoleCollection($roles);

        $this->validateScope($rolesCollection, 'local', 'cargo');

        $roleIds = $rolesCollection->pluck('id')->all();

        DB::transaction(function () use ($editalId, $roleIds) {
            DB::table('model_has_roles_by_edital')
                ->where('user_id', $this->uuid)
                ->where('edital_id', $editalId)
                ->delete();

            if (!empty($roleIds)) {
                $dataToInsert = collect($roleIds)->map(fn ($roleId) => [
                    'user_id' => $this->uuid,
                    'role_id' => $roleId,
                    'edital_id' => $editalId,
                ])->all();

                DB::table('model_has_roles_by_edital')->insert($dataToInsert);
            }
        });

        return $this;
    }

    /**
     * Sincroniza as permissões diretas de um usuário para um edital específico.
     *
     * @param array $permissions Coleção de nomes, IDs ou objetos Permission.
     * @param \App\Models\Edital|int $edital
     * @return self
     */
    public function syncPermissionsForEdital(Collection|array $permissions, $edital): self
    {
        $editalId = $edital instanceof Edital ? $edital->id : $edital;
        $permissionsCollection = $permissions instanceof Collection ?
                $permissions : $this->convertToPermissionCollection($permissions);

        $this->validateScope($permissionsCollection, 'local', 'permissão');

        $permissionIds = $permissionsCollection->pluck('id')->all();

        DB::transaction(function () use ($editalId, $permissionIds) {
            DB::table('model_has_permissions_by_edital')
                ->where('user_id', $this->uuid)
                ->where('edital_id', $editalId)
                ->delete();

            if (!empty($permissionIds)) {
                $dataToInsert = collect($permissionIds)->map(fn ($id) => [
                    'user_id' => $this->uuid,
                    'permission_id' => $id,
                    'edital_id' => $editalId,
                ])->all();

                DB::table('model_has_permissions_by_edital')->insert($dataToInsert);
            }
        });

        return $this;
    }

    // ==========================================================
    // MÉTODOS AUXILIARES
    // ==========================================================

    /**
     * Valida se todos os itens em uma coleção têm o escopo esperado.
     *
     * @param \Illuminate\Database\Eloquent\Collection $collection
     * @param string $scope
     * @param string $type
     * @throws \InvalidArgumentException
     */
    private function validateScope(Collection $collection, string $scope, string $type): void
    {
        $invalidItem = $collection->firstWhere('scope', '!=', $scope);

        if ($invalidItem) {
            throw new InvalidArgumentException(
                "Não é possível sincronizar. O {$type} '{$invalidItem->name}' tem escopo '{$invalidItem->scope}', mas o esperado era '{$scope}'."
            );
        }
    }

    /**
     * Converte um array misto de cargos em uma coleção de Models Role.
     */
    private function convertToRoleCollection(array $roles): Collection
    {
        return collect($roles)->map(function ($role) {
            if ($role instanceof Role) {
                return $role;
            }
            if (is_numeric($role)) {
                return Role::findById($role, $this->getDefaultGuardName());
            }
            if (is_string($role)) {
                return Role::findByName($role, $this->getDefaultGuardName());
            }
        })->filter();
    }

    /**
     * Converte um array misto de permissões em uma coleção de Models Permission.
     */
    private function convertToPermissionCollection(array $permissions): Collection
    {
        return collect($permissions)->map(function ($permission) {
            if ($permission instanceof Permission) {
                return $permission;
            }
            if (is_numeric($permission)) {
                return Permission::findById($permission, $this->getDefaultGuardName());
            }
            if (is_string($permission)) {
                return Permission::findByName($permission, $this->getDefaultGuardName());
            }
        })->filter();
    }
}
