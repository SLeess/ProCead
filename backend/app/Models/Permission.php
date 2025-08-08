<?php

namespace App\Models;

use Spatie\Permission\Models\Permission as PluginPermission;

class Permission extends PluginPermission
{
    public $timestamps = true;
    protected $fillable = [
        'name',
        'scope',
        'guard_name',
        'description',
    ];
    protected $casts = [
        'id' => 'string',
    ];
    
}
