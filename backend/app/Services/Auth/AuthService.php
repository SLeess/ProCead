<?php

namespace App\Services\Auth;

use App\Interfaces\Auth\IAuthService;
use App\Models\User;
use Exception;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class AuthService implements IAuthService
{
    // public function __construct() {}
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

            $data['token'] = $user->createToken('auth_token')->plainTextToken;

            DB::commit();
            return $data;
        } catch (Exception $exception) {
            DB::rollBack();
            throw new Exception('Falha ao processar o login do usuário.');
        }
    }

    public function loginAdmin(array $credentials): array
    {
        if (!Auth::attempt($credentials)) {
            throw new AuthenticationException('Credenciais não encontradas no sistema.');
        }

        $user = Auth::user();

        if ($user->dontHaveAnyPermissionOrRole()) {
            throw new AuthorizationException('Acesso não autorizado.');
        }

        DB::beginTransaction();
        try {

            $user->tokens()->delete();
            $data['token'] = $user->createToken('auth_token_admin')->plainTextToken;

            DB::commit();
            return $data;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception('Falha ao processar o login do administrador.');
        }
    }

    public function registerUser(array $data): array
    {
        $data['password'] = Hash::make($data['password']);

        DB::beginTransaction();
        try {
            $user = User::create($data);
            // $user->assignRole('candidato');

            $success['token'] =  $user->createToken('MyApp')->plainTextToken;
            $success['user'] =  $user;

            DB::commit();
            return $success;
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }

    public function logoutUser(User $user): void
    {
        $user->currentAccessToken()->delete();
    }

    public function sendResetLinkEmail(array $data): array
    {
        DB::beginTransaction();

        try {
            $status = Password::broker()->sendResetLink(
                ['email' => $data['email']]
            );

            if($status == Password::RESET_LINK_SENT){
                DB::commit();
                return ['status' => $status];
            }

            if($status == Password::RESET_THROTTLED){
                throw new Exception('Não foi possível enviar outro link de recuperação, pois já existe um pendente. O tempo entre cada solicitação deve ser de pelo menos '. config('auth.passwords.users.throttle'). ' segundos.');
            }

            throw new Exception('Não foi possível enviar o link de reset de senha. Status: ' . $status);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }


    public function resetPassword(array $data): string
    {
        DB::beginTransaction();

        try {
            $user = User::where('email', $data['email'])->first();
            $user->password = Hash::make($data['password']);
            $user->save();

            DB::table('password_reset_tokens')
                ->where('email', $data['email'])
                ->delete();

            DB::commit();
            return 'Senha alterada com sucesso!';
        } catch (Exception $exception) {
            DB::rollBack();
            throw new Exception('Erro ao tentar trocar a senha: '. $exception->getMessage());
        }
    }
}
