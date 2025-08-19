<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Resources\Admin\EditalCollection;
use App\Http\Resources\Admin\EditalResource;
use App\Models\Edital;
use Illuminate\Http\Request;

class EditalController extends APIController
{
    public function index(){
        $editais = Edital::all();
        // dd($editais);
        return $this->sendResponse(EditalCollection::make($editais), "Editais buscados com sucesso.", 200);
    }
}
