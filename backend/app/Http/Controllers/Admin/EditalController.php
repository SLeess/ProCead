<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Resources\Admin\EditalCollection;
use App\Http\Resources\Admin\EditalResource;
use App\Models\Edital;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EditalController extends APIController
{
    public function index(){
        return $this->sendResponse(
            EditalCollection::make(Edital::all()),
            "Editais buscados com sucesso.",
        );
    }
    /**
     * Display the specified edital.
     */
    public function show(Edital $edital)
    {
        try {
            return $this->sendResponse(
                EditalResource::make($edital),
                "Edital enviada com sucesso."
            );
        } catch (Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
