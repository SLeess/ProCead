<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Models\Curso;
use DB;
use Exception;
use Illuminate\Http\Request;

class CursosController extends APIController
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try{
            $polo = Curso::create(['nome' => $request->nome,'edital_id' => $request->editalId]);
            DB::commit();
            return $this->sendResponse($polo,'Curso criado com sucesso.',200);
        }catch(Exception $e){
            DB::rollBack();
            return $this->sendError($e,'Não foi possível cadastrar o curso', 400);
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
    public function update(Request $request, string $id)
    {
        DB::beginTransaction();
        try{
            $curso = Curso::find($id);
            $curso->update(["nome" => $request->nome]);
            DB::commit();
            return $this->sendResponse($curso,'Curso atualizado com sucesso!',200);
        }catch(Exception $e){
            DB::rollBack();
            return $this->sendError($curso,'Não foi possível atualizar o curso',400);
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
