<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProfileRequest extends FormRequest
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
                'max:191',
                "regex:/^[\pL\s]+$/u",
            ],
            'email' => ['email', 'max:191', Rule::unique('users', 'email')->ignore($this->user),],
            'password' => [\Illuminate\Validation\Rules\Password::min(8),],
            'confirm_password' => 'required_with:password|same:password',
        ];
    }
}
