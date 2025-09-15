<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\QuadroVagaRequest;
use App\Http\Requests\QuadroVagaUpdateRequest;
use App\Models\AnexoQuadroVaga;
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
            $quadroVagas = QuadroVagas::with('anexos')->where('edital_id', $id)->get();
            $quadroVagas->map(function ($vaga) {
                $vaga->campus = $vaga->polos->map(function ($poloVaga) {
                    return $poloVaga->polo;
                });
                $vaga->vaga = $vaga->vaga->vagable->nome;
                foreach ($vaga->vagasPorModalidade as $vpm) {
                    $vpm->sigla = $vpm->modalidade->sigla;
                }
                $vaga->n_vagas = $vaga->vagasPorModalidade->sum('quantidade');
                $vaga->categorias_customizadas = $vaga->categoriasCustomizadas->sortBy('indice')->values();
                return $vaga;
            });
            return $this->sendResponse($quadroVagas, "Quadro de Vagas buscado com sucesso.", 200);
        } catch (Exception $e) {
            return $this->sendError($e, 'Não foi possível buscar o Quadro de Vagas: ' . $e, 400);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(QuadroVagaRequest $request)
    {
        $data = $request->validated();
        // dd($data);
        DB::beginTransaction();
        try {

            $quadro = QuadroVagas::create([
                'codigo' => $data['codigo'],
                'semestre' => $data['semestre'],
                'edital_id' => $data['edital_id'],
                'vaga_id' => $data['vaga'],
                'habilitacao' => $data['habilitacao'],
            ]);
            foreach ($data['modalidades'] as $modalidade) {
                foreach ($modalidade as $key => $value) {
                    if ($value && $value > 0) {
                        $quadro->vagasPorModalidade()->create([
                            'modalidade_id' => Modalidade::where('sigla', $key)->where('edital_id', $data['edital_id'])->first()->id,
                            'quantidade' => $value,
                        ]);
                    }
                }
            }

            foreach ($data['categoriasCustomizadas'] as $index => $categoria) {
                $quadro->categoriasCustomizadas()->create([
                    'nome' => $categoria['nome'],
                    'indice' => $index,
                ]);
            }

            foreach ($data['campus'] as $poloId) {
                $quadro->polos()->create([
                    'quadro_vaga_id' => $quadro->id,
                    'polo_id' => $poloId,
                ]);
            }
            foreach ($data['anexos'] as $anexo) {
                AnexoQuadroVaga::create(['quadro_vaga_id' => $quadro->id, 'anexo_id' => $anexo['id']]);
            }

            DB::commit();
            return $this->sendResponse($quadro, 'Quadro de Vagas criado com sucesso.', 200);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError($e, 'Não foi possível cadastrar o Quadro de Vagas: '.$e->getMessage()." ".$e->getLine(), 400);
        }
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(QuadroVagaUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            $quadro = QuadroVagas::findOrFail($id);

            $quadro->update([
                'codigo' => $data['codigo'],
                'semestre' => $data['semestre'],
                'vaga_id' => $data['vaga'],
                'habilitacao' => $data['habilitacao'],
            ]);

            $quadro->vagasPorModalidade()->delete();
            foreach ($data['modalidades'] as $modalidade) {
                foreach ($modalidade as $key => $value) {
                    if ($value && $value > 0) {
                        $quadro->vagasPorModalidade()->create([
                            'modalidade_id' => Modalidade::where('sigla', $key)->where('edital_id', $data['edital_id'])->first()->id,
                            'quantidade' => $value,
                        ]);
                    }
                }
            }

            $quadro->categoriasCustomizadas()->delete();
            foreach ($request->categoriasCustomizadas as $index => $categoria) {
                $quadro->categoriasCustomizadas()->create([
                    'nome' => $categoria['nome'],
                    'indice' => $index,
                ]);
            }

            $quadro->polos()->delete();
            foreach ($data['campus'] as $poloId) {
                $quadro->polos()->create([
                    'polo_id' => $poloId,
                ]);
            }

            AnexoQuadroVaga::where('quadro_vaga_id',$quadro->id)->delete();
            foreach ($data['anexos'] as $anexo) {
                AnexoQuadroVaga::create(['quadro_vaga_id' => $quadro->id, 'anexo_id' => $anexo['id']]);
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
