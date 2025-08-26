<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Models\Disciplina;
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

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'edital_id' => 'required|integer|exists:editais,id',
            'curso_id' => 'required|integer|exists:cursos,id',
        ]);

        try {
            $disciplina = Disciplina::create([
                'nome' => $request->nome,
                'edital_id' => $request->edital_id,
                'curso_id' => $request->curso_id,
                'carga_horaria' => $request->carga_horaria,
            ]);

            return $this->sendResponse($disciplina, 'Disciplina criada com sucesso.', 200);
        } catch (\Exception $e) {
            return $this->sendError('Error ao criar disciplina.', ['error' => $e->getMessage()], 400);
        }
    }
}
