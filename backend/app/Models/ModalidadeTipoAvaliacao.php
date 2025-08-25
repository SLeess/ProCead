<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ModalidadeTipoAvaliacao extends Model
{
    protected $table = 'modalidade_tipo_avaliacao';
    protected $fillable = [
        'modalidade_id',
        'tipo_avaliacao_id'
    ];

    public function modalidade(){
        return $this->belongsTo(Modalidade::class);
    }

    public function tipo_avaliacao(){
        return $this->belongsTo(TipoAvaliacao::class);
    }
}
