<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Resources\Admin\InscricaoCollection;
use App\Models\Inscricao;
use Illuminate\Http\Request;

class InscricaoController extends APIController
{
    public function index($editalId){
        $inscricoes = Inscricao::with(['vagas_inscricao.vaga.vaga.vagable','vagas_inscricao.modalidade','vagas_inscricao.categoria','vagas_inscricao.polo'])->where('edital_id', $editalId)->get();
        // dd(new InscricaoCollection($inscricoes));
        return new InscricaoCollection($inscricoes);
    }
}
