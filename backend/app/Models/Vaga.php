<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Vaga extends Model
{
    protected $table = 'vagas';
    protected $fillable = [
        'vagable_type',
        'vagable_id',
    ];
    protected $logAttributes = [
        'vagable_type',
        'vagable_id',
    ];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;
    protected static $logName = 'Vaga';

    //polimorfia para permitir que a vaga possa ser associada a diferentes modelos
    //por exemplo, uma vaga pode ser associada a um curso, disciplina ou cargo
    //isso permite que a vaga seja reutilizada em diferentes contextos
    //e facilita a criação de vagas sem precisar duplicar código
    public function vagable(): MorphTo
    {
        return $this->morphTo();
    }
}
