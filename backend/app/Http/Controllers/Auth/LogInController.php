<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\ApiBaseController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends ApiBaseController
{
    public function __construct()
    {
        $this->middleware('guest');
    }

    protected function validateLogin(Request $request)
    {
        $request->validate([
            $this->username() => 'required|email',
            'password' => 'required|string',
        ]);
    }

    protected function authenticated(Request $request, $user)
    {
        // $contexto = Contexto::findOrFail($request->contexto_id);

        // $request->session()->put('contextoId', $contexto->id);
        // $request->session()->put('contextoEdital', $contexto->edital);
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'email';
    }

     public function login(Request $request): Response
    {
        DB::beginTransaction();
        try {
            if($user = Auth::attempt(['email' => $request->email, 'password' => $request->password])){
                $user = Auth::user();

                $user->tokens()->delete();

                $success['token'] =  $user->createToken('MyApp', ['*'])->plainTextToken;
                $success['nome'] =  $user->nome;
                DB::commit();
                return $this->sendResponse($success, 'Login efetuado com sucesso.');
            }
            return $this->sendError('Credenciais não encontradas no sistema', ['error' => 'Unauthorised'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->sendError('Erro na hora de autenticar ao sistema', ["authentication_failed" => $exception->__tostring()], Response::HTTP_BAD_GATEWAY);
        }
    }
}
