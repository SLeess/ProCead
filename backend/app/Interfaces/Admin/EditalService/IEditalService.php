<?php

namespace App\Interfaces\Admin\EditalService;

use App\Models\Edital;

interface IEditalService{
    public function createEdital(array $data): Edital;
}
