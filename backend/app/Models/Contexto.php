<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contexto extends Model
{
    protected $table = "contextos";
    
    protected $fillable =[
        'edital',
        'nome_edital',
        'publico_alvo',
        'formato_notas',
        'tipo_inscricao',
        'max_itens_inscricao',
        'max_itens_posse',
        'remanejamento',
        'categorias',
        'tipo_avaliacao_reserva_vagas'
    ];
    protected $logAttributes =[
        'edital',
        'nome_edital',
        'publico_alvo',
        'formato_notas',
        'tipo_inscricao',
        'max_itens_inscricao',
        'max_itens_posse',
        'remanejamento',
        'categorias',
        'tipo_avaliacao_reserva_vagas'
    ];

    protected static $logOnlyDirty = true;

    protected static $submitEmptyLogs = false;

    protected static $logName = 'Configuração';
}
