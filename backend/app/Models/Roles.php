<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;

class Roles extends Role
{
    public $timestamps = true;
    protected $fillable = [
        'name',
        'guard_name',
    ];
    protected $casts = [
        'id' => 'string',
    ];

}
