<?php

namespace App\Http\Requests;

use App\Rules\Cpf;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
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
            'nome' => [
                'required',
                'max:191',
                "regex:/^[\pL\s]+$/u",
            ],
            'email' => ['required', 'email', 'max:191', Rule::unique('users', 'email'),],
            'cpf' => [
                'required',
                new Cpf,
                Rule::unique('users', 'cpf'),
            ],
            'password' => ['required', \Illuminate\Validation\Rules\Password::min(8),],
            'confirm_password' => 'required|same:password',
        ];
    }

    public function messages(){
        return [
            'email.unique' => 'O email já está em uso.',
        ];
    }
}
