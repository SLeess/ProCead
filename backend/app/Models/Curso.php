<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Curso extends Model
{
    protected $table = 'cursos';
    protected $fillable = [
        'nome',
        'edital_id'
    ];
    protected $logAttributes = [
        'nome',
        'edital_id'
    ];
    protected static $logOnlyDirty = true;

    protected static $submitEmptyLogs = false;

    protected static $logName = 'Curso';
}
