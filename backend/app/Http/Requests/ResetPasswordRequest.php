<?php

namespace App\Http\Requests;

use App\Rules\ResetPasswordTokenValidation;
use Illuminate\Foundation\Http\FormRequest;

class ResetPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'token' => ['required', new ResetPasswordTokenValidation($this->email)],
            'email' => ['required', 'email','exists:users,email'],
            'password' => ['required', \Illuminate\Validation\Rules\Password::min(8),],
            'confirm_password' => 'required|same:password',
        ];
    }

    public function messages(): array
    {
        return [
            'email.exists' => 'O :attribute da requisição é inválido.',
        ];
    }

}
