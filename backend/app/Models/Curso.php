<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Curso extends Vaga
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

    public function vagas(): MorphMany
    {
        return $this->morphMany(Vaga::class, 'vagable');
    }
}
