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
            $quadroVagas->map(function ($vaga) {
                $vaga->campus = $vaga->polo->nome;
                $vaga->vaga = $vaga->vaga->vagable->nome;
                foreach ($vaga->vagasPorModalidade as $vpm) {
                    $vpm->sigla = $vpm->modalidade->sigla;
                }
                $vaga->n_vagas = $vaga->vagasPorModalidade->sum('quantidade');
                $vaga->categorias_customizadas = $vaga->categoriasCustomizadas->sortBy('indice')->values();
                return $vaga;
            });
            // dd($quadroVagas);
            return $this->sendResponse($quadroVagas, "Quadro de Vagas buscado com sucesso.", 200);
        } catch (Exception $e) {
            return $this->sendError($e, 'Não foi possível buscar o Quadro de Vagas: ' . $e->getMessage(), 400);
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
                            'modalidade_id' => Modalidade::where('sigla', $key)->where('edital_id', $request->edital_id)->first()->id,
                            'quantidade' => $value,
                        ]);
                    }
                }
            }

            foreach ($request->categoriasCustomizadas as $index => $categoria) {
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
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try {
            $quadro = QuadroVagas::findOrFail($id);

            $quadro->update([
                'codigo' => $request->codigo,
                'semestre' => $request->semestre,
                'vaga_id' => $request->vaga,
                'polo_id' => $request->campus,
                'habilitacao' => $request->habilitacao,
            ]);

            // Sync Vagas por Modalidade
            $quadro->vagasPorModalidade()->delete();
            foreach ($request->modalidades as $modalidade) {
                foreach ($modalidade as $key => $value) {
                    if ($value && $value > 0) {
                        $quadro->vagasPorModalidade()->create([
                            'modalidade_id' => Modalidade::where('sigla', $key)->where('edital_id', $request->edital_id)->first()->id,
                            'quantidade' => $value,
                        ]);
                    }
                }
            }

            // Sync Categorias Customizadas
            $quadro->categoriasCustomizadas()->delete();
            foreach ($request->categoriasCustomizadas as $index => $categoria) {
                $quadro->categoriasCustomizadas()->create([
                    'nome' => $categoria['nome'],
                    'indice' => $index,
                ]);
            }

            DB::commit();
            return $this->sendResponse($quadro, 'Quadro de Vagas atualizado com sucesso.', 200);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError($e, 'Não foi possível atualizar o Quadro de Vagas: ' . $e->getMessage(), 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
