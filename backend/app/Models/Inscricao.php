<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscricao extends Model
{
    protected $table = 'inscricoes';
    protected $fillable = [
        // informações básicas
        'nome_completo',
        'cpf',
        'email',
        'data_nascimento',
        'telefone',
        'genero',
        'nome_social',
        'identidade_genero',
        'identidade',
        'estado_civil',
        'uf_naturalidade',
        'nacionalidade',
        'naturalidade',
        
        // endereço
        'cep',
        'rua',
        'bairro',
        'cidade',
        'uf',
        'numero',
        'complemento',

        // etc
        'termo_responsabilidade',
        'contexto_id',   
        'status',
        'motivo',
        'user_uuid',
    ];

    protected static $logAttributes = [
        // informações básicas
        'nome_completo',
        'cpf',
        'email',
        'data_nascimento',
        'telefone',
        'genero',
        'nome_social',
        'identidade_genero',
        'identidade',
        'estado_civil',
        'uf_naturalidade',
        'nacionalidade',
        'naturalidade',
        
        // endereço
        'cep',
        'rua',
        'bairro',
        'cidade',
        'uf',
        'numero',
        'complemento',

        // etc
        'termo_responsabilidade',
        'contexto_id',   
        'status',
        'motivo',
        'user_id',
    ];

    protected static $logOnlyDirty = true;

    protected static $submitEmptyLogs = false;

    protected static $logName = 'Inscrição';
}
