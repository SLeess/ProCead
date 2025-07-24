<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\ApiBaseController;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Exception;
use Symfony\Component\HttpFoundation\Response;

class RelatorioController extends ApiBaseController
{
    public function export(Request $request){
        $namePdf = $request->get('title') ?? 'template_download';

        try {
            $pdf = Pdf::
                setOptions(['isPhpEnabled' => true])
                ->loadView('relatorio', $request->all())
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
