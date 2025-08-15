<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\APIController;
use App\Models\Edital;
use App\Models\Inscricao;
use DB;
use Exception;
use Illuminate\Http\Request;

class InscricaoController extends APIController
{
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            if ($request->termo_responsabilidade) {

                Inscricao::create([
                    // informações básicas
                    'nome_completo' => $request->nome_completo,
                    'cpf' => str_replace(['.', '-'], '', $request->cpf),
                    'email' => $request->email,
                    'data_nascimento' => \Carbon\Carbon::parse($request->data_nascimento)->format('Y-m-d'),
                    'telefone' => str_replace(['(', ')', ' ', '-'], '', $request->telefone),
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
                    'edital_id' => $request->editalId
                ]);
                DB::commit();
                return $this->sendResponse($request->all(), 'Inscrição realizada com sucesso!',200);
            } else
                return $this->sendError($request->all(), 'É necessário aceitar o termo de responsabilidade para se inscrever.');
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError($request->all(), 'Erro ao realizar inscrição: ' . $e,400);
        }

    }

    public function index($userUuid)
    {
        //   {
//     id: 1,
//     edital: 'Edital 12/2024',
//     descricao: 'Seleção para Mestrado em Produção Vegetal no Semiárido',
//     inscrito: false,
//   },
        $editais = Edital::all();
        $inscricoes = Inscricao::where('user_uuid', $userUuid)->pluck('edital_id')->toArray();
        $data = $editais->map(function ($item) use ($inscricoes) {
            return [
                "id" => $item->id,
                "edital" => $item->referencia,
                "descricao" => $item->descricao,
                "inscrito" => in_array($item->id, $inscricoes) ? true : false,
            ];
        });
        // dd($data, $editais,$inscricoes);
        return $this->sendResponse($data, "Processos buscados com sucesso.", 200);
    }
    public function show($userUuid, $editalId)
    {
        $inscricao = Inscricao::where('user_uuid', $userUuid)->where('edital_id', $editalId)->get();
        return $this->sendResponse($inscricao, "inscrição buscada com sucesso.", 200);
        // dd($inscricao);
    }
}
