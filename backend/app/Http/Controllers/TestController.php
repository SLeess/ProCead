<?php

namespace App\Http\Controllers;

use App\Http\Controllers\API\APIController;
use App\Models\Edital;
use Illuminate\Http\Request;

class TestController extends APIController
{
    public function store(Request $request, Edital $edital)
    {
        // 1. Autoriza a ação 'inscrever' usando a EditalPolicy.
        // O primeiro argumento é o nome do método na sua policy.
        // O segundo é o modelo ao qual a política se aplica.
        $this->authorize('inscrever', $edital);

        // 2. Se a autorização passar, o resto do código é executado.
        // Lógica para criar a inscrição...

        return redirect()->back()->with('success', 'Inscrição realizada com sucesso!');
    }

    public function painelAdmin(Edital $edital)
    {
        $this->authorize('administrar', $edital);
    }
    public function painelCandidato(Edital $edital)
    {
        $this->authorize('visualizarPainelCandidato', $edital);
    }
}
