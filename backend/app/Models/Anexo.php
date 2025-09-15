<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Anexo extends Model
{
    protected $table = 'anexos';
    protected $fillable = [
        'nome',
        'formato',
        'caminho',
        // 'edital_id', // null antes do edital.
        // 'modalidade_id', // null antes do edital.
        // 'vaga_id' // null antes do edital.
    ];
    protected $logAttributes = [
        'nome',
        'formato',
        'caminho',
        // 'edital_id', // null antes do edital.
        // 'modalidade_id', // null antes do edital.
        // 'vaga_id' // null antes do edital.
    ];

    protected static $logOnlyDirty = true;

    protected static $submitEmptyLogs = false;

    protected static $logName = 'Anexo';
}
