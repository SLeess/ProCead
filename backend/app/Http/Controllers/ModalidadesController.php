<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\APIController;
use App\Models\Modalidade;
use App\Models\ModalidadeTipoAvaliacao;
use App\Models\TipoAvaliacao;
use DB;
use Exception;
use Illuminate\Http\Request;
use function PHPUnit\Framework\returnArgument;

class ModalidadesController extends APIController
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
            $modalidade = Modalidade::create([
                "sigla" => $request->sigla,
                "descricao" => $request->descricao,
                "edital_id" => $request->editalId
            ]);

            if ($request->has('tipos_avaliacao')) {
                foreach ($request->tipos_avaliacao as $tipo) {
                    $tipoModel = TipoAvaliacao::where("tipo", $tipo)->first();
                    if ($tipoModel) {
                        ModalidadeTipoAvaliacao::create([
                            "modalidade_id" => $modalidade->id,
                            "tipo_avaliacao_id" => $tipoModel->id
                        ]);
                    }
                }
            }

            DB::commit();
            return $this->sendResponse($modalidade, 'Modalidade cadastrada com sucesso.', 200);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError($e, "Não foi possível cadastrar a modalidade. " . $e->getMessage(), 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $modalidades = Modalidade::with('tipo_avaliacao.tipo_avaliacao')
            ->where('edital_id', $id)
            ->get();

        $modalidades->each(function ($modalidade) {
            $tipos = $modalidade->tipo_avaliacao->pluck('tipo_avaliacao.tipo');
            $modalidade->tipos_avaliacoes = $tipos;
            unset($modalidade->tipo_avaliacao);
        });

        return $this->sendResponse($modalidades, 'Modalidades buscados com sucesso', 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $modalidade = Modalidade::findOrFail($id);
            $modalidade->update([
                'sigla' => $request->sigla,
                'descricao' => $request->descricao
            ]);

            $modalidade->tipo_avaliacao()->delete();

            if ($request->has('tipos_avaliacao')) {
                foreach ($request->tipos_avaliacao as $tipo) {
                    $tipoModel = TipoAvaliacao::where("tipo", $tipo)->first();
                    if ($tipoModel) {
                        ModalidadeTipoAvaliacao::create([
                            "modalidade_id" => $modalidade->id,
                            "tipo_avaliacao_id" => $tipoModel->id
                        ]);
                    }
                }
            }

            DB::commit();
            return $this->sendResponse($modalidade->load('tipo_avaliacao.tipo_avaliacao'), "Modalidade atualizada com sucesso!", 200);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError($e, "Não foi possível atualizar a modalidade. " . $e->getMessage(), 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $modalidade = Modalidade::find($id);
            $modalidade->tipo_avaliacao()->delete();
            $modalidade->delete();
            DB::commit();
            return $this->sendResponse($modalidade, "Modalidade deletada com sucesso.", 200);
        } catch (Exception $e) {
            return $this->sendError($e, "Não foi possível deletar a modalidade.", 400);
        }
    }
}
