<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\ApiBaseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends ApiBaseController
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    public function register(Request $request)
    {
        $validator = $this->validator($request->all());

        if($validator->fails()){
            return $this->sendError('Erro de validação.', $validator->errors());
        }

        $input = $request->all();
        $input['password'] = Hash::make($input['password']);

        $user = \App\Models\User::create($input);

        $success['token'] =  $user->createToken('MyApp')->plainTextToken;
        $success['user'] =  $user;
        return $this->sendResponse($success, 'Usuário registrado com sucesso.');
    }

    protected function validator(array $data)
    {
        $rules = [
            'nome' => 'required',
            'email' => 'required|email',
            'password' => ['required', \Illuminate\Validation\Rules\Password::min(8),],
            'confirm_password' => 'required|same:password',
        ];

        return \Illuminate\Support\Facades\Validator::make($data, $rules, [], [
            'confirm_password' => 'de Confirmação de Senha',
            'password' => 'de Senha',
            'email' => 'Email',
            'nome' => 'Nome'
        ]);
    }
}
