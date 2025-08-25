<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Disciplina extends Vaga
{
    protected $table = 'disciplinas';
    protected $fillable = [
        'nome',
        'curso_id',
        'carga_horaria'
    ];
    protected $logAttributes = [
        'nome',
        'curso_id',
        'carga_horaria'
    ];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;
    protected static $logName = 'Disciplina';

    public function vagas(): MorphMany
    {
        return $this->morphMany(Vaga::class, 'vagable');
    }
}
