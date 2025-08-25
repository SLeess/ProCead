<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Models\Modalidade;
use App\Models\QuadroVagas;
use DB;
use Exception;
use Illuminate\Http\Request;

class QuadroVagasController extends APIController
{
    /**
     * Display a listing of the resource.
     */
    public function index($id)
    {
        try {
            // $quadroVagas = QuadroVagas::where('edital_id', $id)->get();
            $quadroVagas = QuadroVagas::where('edital_id', $id)->get();
            $quadroVagas->map(function($vaga) {
                $vaga->campus = $vaga->polo->nome;
                $vaga->vaga = $vaga->vaga->vagable->nome;
                $vaga->n_vagas = $vaga->vagasPorModalidade->sum('quantidade');
                return $vaga;
            });
            // dd($quadroVagas);
            return $this->sendResponse($quadroVagas, "Quadro de Vagas buscado com sucesso.", 200);
        } catch (Exception $e) {
            return $this->sendError($e, 'Não foi possível buscar o Quadro de Vagas', 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        DB::beginTransaction();
        try {

            $quadro = QuadroVagas::create([
                'codigo' => $request->codigo,
                'semestre' => $request->semestre,
                'edital_id' => $request->edital_id,
                'vaga_id' => $request->vaga,
                'polo_id' => $request->campus,
                'habilitacao' => $request->habilitacao,
            ]);

            foreach ($request->modalidades as $modalidade) {
                foreach ($modalidade as $key => $value) {
                    if ($value && $value > 0) {
                        $quadro->vagasPorModalidade()->create([
                            'modalidade_id' => Modalidade::where('sigla', $key)->where('edital_id',$request->edital_id)->first()->id,
                            'quantidade' => $value,
                        ]);
                    }
                }
            }

            foreach($request->categoriasCustomizadas as $index => $categoria){
                $quadro->categoriasCustomizadas()->create([
                    'nome' => $categoria['nome'],
                    'indice' => $index,
                ]);
            }
            DB::commit();
            return $this->sendResponse($quadro, 'Quadro de Vagas criado com sucesso.', 200);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError($e, 'Não foi possível cadastrar o Quadro de Vagas', 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $editalId, string $quadroId)
    {
        try {
            // $quadroVagas = QuadroVagas::where('edital_id', $id)->get();
            $quadroVagas = QuadroVagas::where('edital_id', $editalId)->where('id', $quadroId)->first();
            $quadroVagas->campus = $quadroVagas->polo->nome;
            $quadroVagas->vaga = $quadroVagas->vaga->vagable->nome;
            $quadroVagas->vagas = $quadroVagas->vagasPorModalidade;
            $quadroVagas->categoriasCustomizadas()->sortBy('indice')->values();
            dd($quadroVagas);
            return $this->sendResponse($quadroVagas, "Quadro de Vagas buscado com sucesso.", 200);
        } catch (Exception $e) {
            return $this->sendError($e, 'Não foi possível buscar o Quadro de Vagas', 400);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
