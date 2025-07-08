<?php

namespace App\Services\Auth;

use App\Models\User;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthService
{
    /**
     * Tenta autenticar um usuário e retorna os dados do token.
     * Lança exceções em caso de falha.
     */
    public function loginUser(array $credentials): array
    {
        if (!Auth::attempt($credentials)) {
            throw new AuthenticationException('Credenciais não encontradas no sistema.');
        }

        DB::beginTransaction();
        try {
            $user = Auth::user();
            /** @var \App\Models\User $user */
            $user->tokens()->delete();

            $data['token'] = $user->createToken('auth_token', ['access:candidate'])->plainTextToken;
            $data['permissions'] = $user->getPermissionNames();
            $data['roles'] = $user->getRoleNames();

            DB::commit();
            return $data;
        } catch (Exception $exception) {
            DB::rollBack();
            throw new Exception('Falha ao processar o login do usuário.');
        }
    }

    /**
     * Tenta autenticar um administrador e retorna os dados do token.
     */
    public function loginAdmin(array $credentials): array
    {
        if (!Auth::attempt($credentials)) {
            throw new AuthenticationException('Credenciais não encontradas no sistema.');
        }

        $user = Auth::user();

        /** @var \App\Models\User $user */
        if (!$user->hasRole('admin')) {
            throw new AuthorizationException('Acesso não autorizado.');
        }

        DB::beginTransaction();
        try {

            $user->tokens()->delete();
            $data['token'] = $user->createToken('auth_token_admin', ['access:admin'])->plainTextToken;
            $data['permissions'] = $user->getPermissionNames();
            $data['roles'] = $user->getRoleNames();

            DB::commit();
            return $data;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Falha ao processar o login do administrador.');
        }
    }

    /**
     * Registra um novo usuário.
     */
    public function registerUser(array $data): array
    {
        $data['password'] = Hash::make($data['password']);

        DB::beginTransaction();
        try {
            $user = User::create($data);
            $user->assignRole('candidato');

            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['user'] =  $user;

            DB::commit();
            return $success;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }

    /**
     * Faz o logout do usuário logado atualmente.
     */
    public function logoutUser(User $user): void
    {
        $user->currentAccessToken()->delete();
    }

    public function sendResetLinkEmail(array $data): array
    {
        DB::beginTransaction();
        try {
            $status = Password::broker()->sendResetLink(
                $data['email'],
            );

            if($status == Password::RESET_LINK_SENT){
                return ['status' => $status];
            }

            throw new Exception('Link de reset de senha não foi enviado.');
        } catch (Exception $e) {
            throw new Exception($e->__toString());
        }
    }
}
