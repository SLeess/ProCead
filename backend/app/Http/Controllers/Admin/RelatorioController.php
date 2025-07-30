<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\ApiController;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class RelatorioController extends ApiController
{
    public function export(Request $request){
        $namePdf = $request->get('title') ?? 'template_download';
        $data = $request->all();
        // dd($data);
        if($data['columns'][count($data['columns']) - 1]['id'] == 'actions')
            array_pop($data['columns']);
        try {
            $pdf = Pdf::
                setOptions(['isPhpEnabled' => true])
                ->loadView('relatorio', $data)
                ->setPaper('a4', $request->get('orientacao') ?? 'portrait')
                ->download($namePdf. $this->now() .".pdf");

            return $pdf;
        } catch (Exception $e) {
            return $this->sendError($e->getLine(), [$e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function now()
    {
        return now()->format('y_m_d__h_i_s_');
    }
}
