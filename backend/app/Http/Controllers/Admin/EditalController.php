<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\StoreEditalRequest;
use App\Http\Resources\Admin\EditalAttributesResource;
use App\Http\Resources\Admin\EditalCollection;
use App\Http\Resources\Admin\EditalResource;
use App\Interfaces\Admin\EditalService\IEditalService;
use App\Models\Edital;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class EditalController extends APIController
{
    public function __construct(
        protected IEditalService $iEditalService
    ){
        $this->middleware('permission:cadastrar-edital')->only(['store', 'create']);
        $this->middleware('permission:editar-edital')->only(['update', 'edit']);
    }

    public function index(){
        return $this->sendResponse(
            EditalCollection::make(Edital::all()->load(['datas', 'momentosRecurso'])),
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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return $this->sendResponse([
            EditalAttributesResource::make(null)
        ], "Dados essenciais para criação de um edital recebidos com sucesso");
    }

    public function store(StoreEditalRequest $request)
    {
        try {
            $edital = $this->iEditalService->createEdital($request->validated());

            return response()->json([
                'message' => 'Edital cadastrado com sucesso!',
                'edital_id' => $edital->id
            ], 201);

        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        } catch (Exception $e) {
            // Log do erro real para debug
            Log::error('Erro ao criar edital: ' . $e->getMessage());
            return response()->json(['error' => 'Ocorreu um erro interno ao processar a requisição.'], 500);
        }
    }
}
