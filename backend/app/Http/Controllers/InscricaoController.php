<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\StoreInscricaoRequest;
use App\Models\Edital;
use App\Models\Inscricao;
use App\Services\Candidato\InscricaoService;
use DB;
use Exception;
use Illuminate\Http\Request;

class InscricaoController extends APIController
{
    protected $inscricaoService;

    public function __construct(InscricaoService $inscricaoService)
    {
        $this->inscricaoService = $inscricaoService;
    }

    public function store(StoreInscricaoRequest $request)
    {
        try {
            $validatedData = $request->validated();
            $inscricao = $this->inscricaoService->createInscricao($validatedData);
            return $this->sendResponse($inscricao, 'Inscrição realizada com sucesso! Redirecionando...',200);
        } catch (Exception $e) {
            return $this->sendError('Erro ao realizar inscrição.', $e->getMessage(), 400);
        }
    }

    public function index($userUuid)
    {
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
        return $this->sendResponse($data, "Processos buscados com sucesso.", 200);
    }
    public function show($userUuid, $editalId)
    {
        $inscricao = Inscricao::where('user_uuid', $userUuid)->where('edital_id', $editalId)->get();
        return $this->sendResponse($inscricao, "inscrição buscada com sucesso.", 200);
    }
}
