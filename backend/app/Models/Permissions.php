<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Permission;

class Permissions extends Permission
{
    public $timestamps = true;
    protected $fillable = [
        'name',
        'guard_name',
        'description',
    ];
    protected $casts = [
        'id' => 'string',
    ];
}
