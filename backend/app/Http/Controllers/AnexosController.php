<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\AnexoRequest;
use App\Models\Anexo;
use DB;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AnexosController extends APIController
{

    public function index(){
        // dd("aqui");
        try {
            $anexo = Anexo::all();
            return $this->sendResponse(
                $anexo,
                "Anexos enviados com sucesso.",
                200
            );
        } catch (Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AnexoRequest $request)
    {
        DB::beginTransaction();
        $data = $request->validated();
        try {
            $anexo = Anexo::create([
                "nome" => $data['nome'],
                "formato" => $data['formato'],
                "caminho" => null,
                "edital_id" => null,
                "modalidade_id" => null,
                "vaga_id" => null,
            ]);

            DB::commit();
            return $this->sendResponse($anexo, 'Anexo cadastrado com sucesso.', 200);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError($e, "Não foi possível cadastrar o anexo. " . $e->getMessage(), 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AnexoRequest $request, string $id)
    {
        DB::beginTransaction();
        $data = $request->validated();
        try {
            $anexo = Anexo::findOrFail($id);
            $anexo->update([
                "nome" => $data['nome'],
                "formato" => $data['formato'],
                "caminho" => null,
                "edital_id" => null,
                "modalidade_id" => null,
                "vaga_id" => null,
            ]);

            DB::commit();
            return $this->sendResponse($anexo, 'Anexo atualizado com sucesso.', 200);
        } catch (Exception $e) {
            DB::rollBack();
            return $this->sendError($e, "Não foi possível atualizar o anexo. " . $e->getMessage(), 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Anexo $anexo)
    {
        DB::beginTransaction();
        try{
            // $anexo = Anexo::find($id);
            $anexo->delete();
            DB::commit();
            return $this->sendResponse($anexo,'Anexo deletado com sucesso',200);
        }catch(Exception $e){
            DB::rollBack();
            return $this->sendError($e,"Não foi possível deletar o anexo",400);
        }
    }
}
