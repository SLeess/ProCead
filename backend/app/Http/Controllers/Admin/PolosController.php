<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\PoloRequest;
use App\Models\Polo;
use DB;
use Exception;
use Illuminate\Http\Request;

class PolosController extends APIController
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(PoloRequest $request)
    {
        $data = $request->validated();
        DB::beginTransaction();
        try{
            $polo = Polo::create(['nome' => $data['nome'],'edital_id' => $data['editalId']]);
            DB::commit();
            return $this->sendResponse($polo,'Polo criado com sucesso.',200);
        }catch(Exception $e){
            DB::rollBack();
            return $this->sendError($e,[/*'error' => 'Não foi possível cadastrar o polo',*/ 'error' => $e->getMessage()], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $polos = Polo::where('edital_id',$id)->get();
        return $this->sendResponse($polos, "Polos buscados com sucesso.",200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PoloRequest $request, string $id)
    {
        DB::beginTransaction();
        $data = $request->validated();
        try{
            $polo = Polo::find($id);
            $polo->update(["nome" => $data['nome']]);
            DB::commit();
            return $this->sendResponse($polo,'Polo atualizado com sucesso!',200);
        }catch(Exception $e){
            DB::rollBack();
            return $this->sendError($polo,'Não foi possível atualizar o polo',400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::beginTransaction();
        try{
            $polo = Polo::find($id);
            $polo->delete();
            DB::commit();
            return $this->sendResponse($polo,'Polo deletado com sucesso',200);
        }catch(Exception $e){
            DB::rollBack();
            return $this->sendError($e,"Não foi possível deletar o polo",400);
        }
        
    }
}
