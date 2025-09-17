<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\Admin\StoreUpdateCursoRequest;
use App\Models\Curso;
use Exception;
use Illuminate\Support\Facades\DB;

class CursosController extends APIController
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUpdateCursoRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try{
            $curso = Curso::create(['nome' => $data['nome'],'edital_id' => $data['editalId']]);
            $curso->vagas()->create([
                'vagable_id' => $curso->id,
                'vagable_type' => Curso::class
            ]);
            DB::commit();
            return $this->sendResponse($curso,'Curso criado com sucesso.',200);
        }catch(Exception $e){
            DB::rollBack();
            return $this->sendError($e,'Não foi possível cadastrar o curso: '.$e, 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $cursos = Curso::where('edital_id',$id)->get();
        return $this->sendResponse($cursos,'Cursos buscados com sucesso',200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StoreUpdateCursoRequest $request, string $id)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try{
            $curso = Curso::find($id);
            $curso->update(["nome" => $data['nome']]);
            DB::commit();
            return $this->sendResponse($curso,'Curso atualizado com sucesso!',200);
        }catch(Exception $e){
            DB::rollBack();
            return $this->sendError($e,'Não foi possível atualizar o curso',400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try{
            $curso = Curso::find($id);
            $curso->delete();
            DB::commit();
            return $this->sendResponse($curso,'Curso deletado com sucesso',200);
        }catch(Exception $e){
            DB::rollBack();
            return $this->sendError($e,"Não foi possível deletar o curso",400);
        }
    }
}
