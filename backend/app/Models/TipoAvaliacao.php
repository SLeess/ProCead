<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoAvaliacao extends Model
{
    protected $table = 'tipos_avaliacao';
    public $timestamps = false;
    protected $fillable = [
        'tipo'
    ];
}
