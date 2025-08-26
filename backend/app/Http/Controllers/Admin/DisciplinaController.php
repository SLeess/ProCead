<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\DisciplinaRequest;
use App\Models\Disciplina;
use DB;
use Illuminate\Http\Request;

class DisciplinaController extends APIController
{
    public function show(string $id)
    {
        try {
            $disciplinas = Disciplina::where('edital_id', $id)->get();
            $disciplinas->map(function ($disciplina) {
                $disciplina->curso_nome = $disciplina->curso->nome;
                return $disciplina;
            });

            return $this->sendResponse($disciplinas, 'Disciplinas buscadas com sucesso.', 200);
        } catch (\Exception $e) {
            return $this->sendError('Error ao buscar disciplinas.', ['error' => $e->getMessage()], 400);
        }
    }

    public function store(DisciplinaRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            $disciplina = Disciplina::create([
                'nome' => $data['nome'],
                'edital_id' => $data['edital_id'],
                'curso_id' => $data['curso_id'],
                'carga_horaria' => $data['carga_horaria'],
            ]);
            $disciplina->vagas()->create([
                'vagable_id' => $disciplina->id,
                'vagable_type' => Disciplina::class
            ]);
            DB::commit();
            return $this->sendResponse($disciplina, 'Disciplina criada com sucesso.', 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Error ao criar disciplina.', ['error' => $e->getMessage()], 400);
        }
    }

    public function update(DisciplinaRequest $request, string $id)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try {
            $disciplina = Disciplina::findOrFail($id);
            $disciplina->update([
                'nome' => $data['nome'],
                'edital_id' => $data['edital_id'],
                'curso_id' => $data['curso_id'],
                'carga_horaria' => $data['carga_horaria']
            ]);
            DB::commit();
            return $this->sendResponse($disciplina, 'Disciplina atualizada com sucesso.', 200);
        } catch (\Exception $e) {
            return $this->sendError('Error ao atualizar disciplina.', ['error' => $e->getMessage()], 400);
        }
    }

    public function destroy(string $id)
    {
        DB::beginTransaction();
        try {
            $disciplina = Disciplina::findOrFail($id);
            $disciplina->delete();
            DB::commit();
            return $this->sendResponse($disciplina, 'Disciplina deletada com sucesso.', 200);
        } catch (\Exception $e) {
            DB::rollBack();
            return $this->sendError('Error ao deletar disciplina.', ['error' => $e->getMessage()], 400);
        }
    }
}
