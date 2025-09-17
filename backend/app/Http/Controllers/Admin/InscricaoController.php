<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\Admin\UpdateInscricaoRequest;
use App\Http\Resources\Admin\InscricaoCollection;
use App\Models\Inscricao;
use Date;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InscricaoController extends APIController
{
    public function index($editalId){
        try{
            $inscricoes = Inscricao::with(['vagas_inscricao.vaga.vaga.vagable','vagas_inscricao.modalidade','vagas_inscricao.categoria','vagas_inscricao.polo'])
                ->where('edital_id', $editalId)
                ->get();


            return $this->sendResponse(new InscricaoCollection($inscricoes), 'Inscrições retornadas com sucesso!',200);
        }catch(\Exception $e){
            return $this->sendError('Erro ao retornar as inscrições: '.$e->getMessage(), [], 500);
        }
    }
    public function avaliar(Request $request, $id){
        $data = $request->validate([
            'status' => 'required|in:Em análise,Deferido,Indeferido',
            'motivo' => 'nullable|string|max:1000',
        ]);
        DB::beginTransaction();
        try{
            $inscricao = Inscricao::findOrFail($id);
            $inscricao->status = $data['status'];
            $inscricao->motivo = $data['motivo'];
            $inscricao->save();
            DB::commit();
            return $this->sendResponse($inscricao, 'Inscrição atualizada com sucesso!',200);
        }catch(\Exception $e){
            DB::rollBack();
            return $this->sendError('Erro ao atualizar a inscrição: '.$e->getMessage(), [], 500);
        }
    }

    public function update(UpdateInscricaoRequest $request, $id){
        DB::beginTransaction();
        try{
            $inscricao = Inscricao::findOrFail($id);
            $data = $request->validated();
            $data['data_nascimento'] = date('Y-m-d', strtotime($data['data_nascimento']));
            // dd($data);
            $inscricao->update($data);
            DB::commit();
            return $this->sendResponse($inscricao, 'Inscrição atualizada com sucesso!',200);
        }catch(\Exception $e){
            DB::rollBack();
            return $this->sendError('Erro ao atualizar a inscrição: '.$e->getMessage(), [], 500);
        }
    }
}
