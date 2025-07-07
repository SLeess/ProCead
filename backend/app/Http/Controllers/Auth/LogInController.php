<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\APIController;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends APIController
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

    public function loginCandidate(Request $request): Response
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        DB::beginTransaction();
        try {
            if(Auth::attempt($credentials)){
                $user = $request->user();

                $user->tokens()->delete();

                $success['token'] =  $user->createToken('MyApp', ['access:candidate'])->plainTextToken;
                $success['permissions'] = $user->getPermissionNames();
                $success['roles'] = $user->getRoleNames();
                DB::commit();
                return $this->sendResponse($success, 'Login efetuado com sucesso.');
            }
            return $this->sendError('Credenciais não encontradas no sistema', ['error' => 'Unauthorised'], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $exception) {
            DB::rollBack();
            return $this->sendError('Erro na hora de autenticar ao sistema', ["authentication_failed" => $exception->__tostring()], Response::HTTP_BAD_GATEWAY);
        }
    }

    public function loginAdmin(Request $request){
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($credentials)) {
            return $this->sendError('Credenciais inválidas', ["credentials_error" => "Credenciais não encontradas no sistema."], Response::HTTP_UNAUTHORIZED);
        }

        $user = $request->user();

        if (!$user->hasRole('admin')) {
            return $this->sendError('Acesso não autorizado.', ["authorization_error" => "Acesso não autorizado."], Response::HTTP_UNAUTHORIZED);
        }

        $user->tokens()->delete();
        $token = $user->createToken('auth_token_admin', ['access:admin'])->plainTextToken;

        return $this->sendResponse([
            'token' => $token,
            'permissions' => $user->getPermissionNames(),
            'roles' => $user->getRoleNames(),
        ], 'Login efetuado com sucesso.');
    }

    public function me(Request $request)
    {
        return $request->user()->load('roles', 'permissions');
    }
}
