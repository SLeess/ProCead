<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\ApiBaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LogOutController extends ApiBaseController
{
    public function __construct()
    {
        $this->middleware('auth:sanctum')->except('logout');
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return $this->sendResponse([], 'Logout efetuado com sucesso.', Response::HTTP_OK);
    }
}
