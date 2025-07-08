<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;

class RegisterController extends APIController
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function register(RegisterRequest $request)
    {
        $validator = $request->validated();

        if ($validator->fails()) {
            return $this->sendError('Erro de validação.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = \App\Models\User::create($input)->assignRole('candidato');
        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['user'] =  $user;
        return $this->sendResponse($success, 'Usuário registrado com sucesso.');
    }
}
