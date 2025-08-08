<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\API\APIController;

class __SuperAdminController extends APIController
{
    public function __construct(){
        $this->middleware('role:super-Admin');
    }
}
