<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class VagaInscricao extends Model
{
    protected $table = 'vagas_inscricao';

    protected $fillable = [
        'inscricao_id',
        'quadro_vaga_id',
        'modalidade_id',
        'categoria_vaga_id',
        'polo_id'
    ];
    protected $logAttributes = [
        'inscricao_id',
        'quadro_vaga_id',
        'modalidade_id',
        'categoria_vaga_id',
        'polo_id'

    ];

    protected $logOnlyDirty = true;
    protected static $logName = 'Vaga Inscrição';
    protected $sendEmptyLogs = false;

    public function inscricao()
    {
        return $this->belongsTo(Inscricao::class, 'inscricao_id');
    }

    public function vaga()
    {
        return $this->belongsTo(QuadroVagas::class, 'quadro_vaga_id');
    }

    public function modalidade()
    {
        return $this->belongsTo(Modalidade::class, 'modalidade_id');
    }

    public function categoria()
    {
        return $this->belongsTo(CategoriasVaga::class, 'categoria_vaga_id');
    }

    public function polo()
    {
        return $this->belongsTo(Polo::class, 'polo_id');
    }
}
