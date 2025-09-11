<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnexoQuadroVaga extends Model
{
    protected $table = 'anexos_quadro_vaga';
    protected $fillable = [
        'anexo_id',
        'quadro_vaga_id',
    ];

    protected $logAttributes = [
        'anexo_id',
        'quadro_vaga_id',
    ];

    protected $submitEmptyLogs = false;
    protected $logOnlyDirty = true;
    public function anexo()
    {
        return $this->belongsTo(Anexo::class);
    }
    public function quadroVaga(){
        return $this->belongsTo(QuadroVagas::class);
    }
}
