<?php

namespace App\Rules;

use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ResetPasswordTokenValidation implements ValidationRule
{

    public function __construct(private string $email)
    {

    }
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $token = $value;

        $passwordResetToken = DB::table('password_reset_tokens')
            ->where('email', $this->email)
            ->first();

        if (!$passwordResetToken || $this->tokenExpired($passwordResetToken->created_at)) {
            $fail('O token de redefinição de senha é inválido ou expirou.');
            return;
        }

        if (!Hash::check($token, $passwordResetToken->token)) {
            $fail('O token de redefinição de senha é inválido.');
        }
    }

    /**
     * Verifica se o token expirou com base na configuração em config/auth.php.
     */
    protected function tokenExpired(string $createdAt): bool
    {
        $expiresInMinutes = config('auth.passwords.users.expire');
        return Carbon::parse($createdAt)->addMinutes($expiresInMinutes)->isPast();
    }
}
