<?php

namespace App\Models;

use App\Exceptions\DifferentScopeException;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Collection;
use Spatie\Permission\Contracts\Permission;
use Spatie\Permission\Models\Role as PluginRole;
class Role extends PluginRole
{
    public $timestamps = true;
    protected $fillable = [
        'name',
        'guard_name',
        'scope',
    ];
    protected $casts = [
        'id' => 'string',
    ];


    public function permissions(): BelongsToMany
    {
        return $this->belongsToMany(
            config('permission.models.permission'),
            config('permission.table_names.role_has_permissions'),
            config('permission.column_names.role_foreign_key'),
            config('permission.column_names.permission_foreign_key')
        );
    }


    /**
     * @override
     * Grant the given permission(s) to a role.
     *
     * @param  string|int|array|Permission|Collection|\BackedEnum  $permissions
     * @return $this
     */
    public function givePermissionTo(...$permissions)
    {
        $permissionsCollection = collect($permissions)
            ->flatten()
            ->map(fn ($permission) => $this->getStoredPermission($permission))
            ->filter();

        if ($this->scope === 'global' && $permissionsCollection->contains('scope', 'local')) {
            throw new DifferentScopeException("Papéis globais não podem ser associados a permissões de escopo local.");
        }

        if ($this->scope === 'local' && $permissionsCollection->contains('scope', 'global')) {
            throw new DifferentScopeException("Papéis local não podem ser associados a permissões de escopo global.");
        }

        return parent::givePermissionTo($permissionsCollection);
    }
}
