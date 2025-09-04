<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Models\Inscricao;
use Illuminate\Http\Request;

class InscricaoController extends APIController
{
    public function index($editalId){
        $inscricoes = Inscricao::where('edital_id', $editalId)->get();
        return $this->sendResponse($inscricoes, "Inscrições buscadas com sucesso.", 200);
    }
}
