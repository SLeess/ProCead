<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Polo extends Model
{
    protected $table = 'polos';
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

    protected static $logName = 'Polos';
}
