<?php

namespace App\Interfaces\Auth;

use App\Models\User;

interface IAuthService
{
    /**
     * Tenta autenticar um usuário e retorna os dados do token.
     * Lança exceções em caso de falha.
     */
    public function loginUser(array $credentials): array;

    /**
     * Tenta autenticar um administrador e retorna os dados do token.
     */
    public function loginAdmin(array $credentials): array;

    /**
     * Registra um novo usuário.
     */
    public function registerUser(array $data): array;

    /**
     * Faz o logout do usuário logado atualmente.
     */
    public function logoutUser(User $user): void;

    /**
     * Enviar um link de reset de senha via API contectando
     * o token gerado na tabela PasswordResetLink, o email
     * com o link do frontend do projeto
     * @param array $data
     * @return array
     */
    public function sendResetLinkEmail(array $data): array;


    /**
     * Faz a troca para a senha nova resetada do usuário, o retorno é
     * Uma mensagem de confirmação ou uma exception lançada para
     * informar o erro
     * @param array $data
     * @return string
     */
    public function resetPassword(array $data): string;
}
