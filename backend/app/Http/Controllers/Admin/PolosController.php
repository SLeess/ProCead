<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Models\Polo;
use DB;
use Exception;
use Illuminate\Http\Request;

class PolosController extends APIController
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request->all());
        DB::beginTransaction();
        try{
            $polo = Polo::create(['nome' => $request->nome,'edital_id' => $request->editalId]);
            DB::commit();
            return $this->sendResponse($polo,'Polo criado com sucesso.',200);
        }catch(Exception $e){
            DB::rollBack();
            return $this->sendError($e,'Não foi possível cadastrar o polo', 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $polos = Polo::where('edital_id',$id)->get();
        // dd($polos);
        return $this->sendResponse($polos, "Polos buscados com sucesso.",200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($request->nome);
        DB::beginTransaction();
        try{
            $polo = Polo::find($id);
            $polo->update(["nome" => $request->nome]);
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
        // dd($id);
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
