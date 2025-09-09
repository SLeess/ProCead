<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\API\APIController;
use App\Http\Requests\LoginRequest;
use App\Interfaces\Auth\IAuthService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Agent\Agent;
use Symfony\Component\HttpFoundation\Response;

class LoginController extends APIController
{
    public function __construct(protected IAuthService $authService)
    {
        $this->middleware('guest');
    }

    protected function authenticated(Request $request, $user)
    {
        // $contexto = Contexto::findOrFail($request->contexto_id);

        // $request->session()->put('contextoId', $contexto->id);
        // $request->session()->put('contextoEdital', $contexto->edital);
    }

    public function loginCandidate(LoginRequest $request): Response
    {
        try {
            $result = $this->authService->loginUser($request->validated());

            $this->assignDataFromAtemptUser($request);

            return $this->sendResponse($result, 'Login efetuado com sucesso.');
        } catch (AuthenticationException $e) {
            return $this->sendError('Erro de Autenticação.', [0 => $e->getMessage()], Response::HTTP_UNAUTHORIZED);
        } catch (\Exception $e) {
            return $this->sendError('Erro genérico.', [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function loginAdmin(LoginRequest $request){
        try {
            $result = $this->authService->loginAdmin($request->validated());

            $this->assignDataFromAtemptUser($request);

            return $this->sendResponse($result, 'Login efetuado com sucesso.', Response::HTTP_OK);
        } catch (AuthenticationException $e) {
            return $this->sendError('Erro de Autenticação.', [0 => $e->getMessage()], Response::HTTP_UNAUTHORIZED);
        } catch (AuthorizationException $e) {
            return $this->sendError('Erro de Autorização.', [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        } catch (\Exception $e) {
            return $this->sendError('Erro genérico.', [$e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    private function assignDataFromAtemptUser(Request $request)
    {
        $agent = new Agent();
        $agent->setUserAgent($request->userAgent());

        $logProperties = [
            'ip_address'   => $request->ip(),
            'user_agent'   => $request->userAgent(),
            'browser'      => $agent->browser() . ' (' . $agent->version($agent->browser()) . ')',
            'platform'     => $agent->platform() . ' (' . $agent->version($agent->platform()) . ')',
            'device'       => $agent->device(),
            'is_robot'     => $agent->isRobot(),
        ];

        activity('Login')
            ->causedBy(Auth::user()) // Agora usamos o usuário correto
            ->withProperties($logProperties)
            ->event('Login')
            ->log("O usuário '". Auth::user()->nome . "' acabou de fazer login.");
    }
}
