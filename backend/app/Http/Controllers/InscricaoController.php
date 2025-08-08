<?php

namespace App\Http\Controllers;

use App\Models\Inscricao;
use Illuminate\Http\Request;

class InscricaoController
{
    public function store(Request $request)
    {
        // dd($request->editalId);
        Inscricao::create([
            // informações básicas
            'nome_completo' => $request->nome_completo,
            'cpf' => str_replace(['.', '-'], '', $request->cpf),
            'email' => $request->email,
            'data_nascimento' => \Carbon\Carbon::parse($request->data_nascimento)->format('Y-m-d'),
            'telefone' => str_replace(['(',')',' ','-'],'',$request->telefone),
            'genero' => $request->genero,
            'nome_social' => $request->nome_social,
            'identidade_genero' => $request->identidade_genero,
            'identidade' => $request->rg,
            'estado_civil' => $request->estado_civil,
            'uf_naturalidade' => $request->uf_naturalidade,
            'nacionalidade' => $request->nacionalidade,
            'naturalidade' => $request->naturalidade,
            
            // endereço
            'cep' => $request->cep,
            'rua' => $request->rua,
            'bairro' => $request->bairro,
            'cidade' => $request->cidade,
            'uf' => $request->uf,
            'numero' => $request->numero,
            'complemento' => $request->complemento,
            
            // etc
            'termo_responsabilidade' => $request->termo_responsabilidade,
            'contexto_id' => $request->editalId,
            'status' => $request->status,
            'motivo' => $request->motivo,
            'user_uuid' => $request->user['uuid'],
        ]);
        dd(Inscricao::first(), $request->all());

    }
}
