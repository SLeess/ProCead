<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Edital extends Model
{
    use HasFactory;
    protected $table = 'editais';

    protected $fillable =[
        'referencia',
        'descricao',
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
        'referencia',
        'descricao',
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
