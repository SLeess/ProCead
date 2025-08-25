<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CategoriasVaga extends Model
{
    protected $table = 'categorias_vaga';
    protected $fillable = [
        'nome',
        'indice',
        'quadro_vaga_id',

    ];
    protected $logAttributes = [
        'nome',
        'indice',
        'quadro_vaga_id',

    ];



}
