<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Models\Vaga;
use Illuminate\Http\Request;

class VagasController extends APIController
{
    public function index(string $id)
    {
        $vagas = Vaga::with('vagable')->whereHasMorph(
            'vagable',
            '*',
            fn ($query) => $query->where('edital_id', $id)
        )->get();
            // dd($vagas);
        $vagas = $vagas->map(function ($vaga) {
            return [
                'id' => $vaga->id,
                'vagable_type' => $vaga->vagable_type,
                'vagable_id' => $vaga->vagable_id,
                'nome' => $vaga->vagable->nome,
            ];
        });
        

        return $this->sendResponse($vagas, "Vagas buscadas com sucesso.", 200);
    }
}
