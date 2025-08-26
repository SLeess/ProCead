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
        'edital_id',
        'carga_horaria'
    ];
    protected $logAttributes = [
        'nome',
        'curso_id',
        'edital_id',
        'carga_horaria'
    ];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;
    protected static $logName = 'Disciplina';

    public function vagas(): MorphMany
    {
        return $this->morphMany(Vaga::class, 'vagable');
    }
    public function curso()
    {
        return $this->belongsTo(Curso::class, 'curso_id');
    }
}
