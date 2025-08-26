<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VagasPorModalidade extends Model
{
    protected $table = 'vagas_por_modalidade';
    protected $fillable = [
        'modalidade_id',
        'quadro_vaga_id',
        'quantidade'
    ];

    public function modalidade()
    {
        return $this->belongsTo(Modalidade::class);
    }
}
