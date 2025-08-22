<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Modalidade extends Model
{
    protected $table = 'modalidades';
    protected $fillable = [
        'sigla',
        'descricao',
        'edital_id'
    ];
    protected $logAttributes = [
        'sigla',
        'descricao',
        'edital_id'
    ];

    protected static $logOnlyDirty = true;

    protected static $submitEmptyLogs = false;

    protected static $logName = 'Modalidade';

    public function tipo_avaliacao(){
        return $this->hasMany(ModalidadeTipoAvaliacao::class);
    }
}
