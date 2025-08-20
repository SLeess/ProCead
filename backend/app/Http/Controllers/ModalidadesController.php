<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\APIController;
use App\Models\Modalidade;
use Illuminate\Http\Request;

class ModalidadesController extends APIController
{


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {   
        // Eager load the relationships to avoid N+1 queries
        $modalidades = Modalidade::with('tipo_avaliacao.tipo_avaliacao')
                                ->where('edital_id', $id)
                                ->get();

        // Transform the collection to add the desired attribute
        $modalidades->each(function ($modalidade) {
            // Pluck the 'tipo' attribute from the nested relationship
            $tipos = $modalidade->tipo_avaliacao->pluck('tipo_avaliacao.tipo');
            $modalidade->tipos_avaliacoes = $tipos;
            // Unset the original relationship data to keep the JSON response clean
            unset($modalidade->tipo_avaliacao); 
        });

        return $this->sendResponse($modalidades, 'modalidades buscados com sucesso', 200);
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
