<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * A senha padrão para todos os usuários criados pela factory.
     */
    protected static ?string $password;

    /**
     * Define o estado padrão do modelo.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // ✅ Adicionado o campo 'nome'
            'nome' => fake()->name(),

            // ✅ Adicionado o campo 'cpf' com um gerador de CPF (apenas números)
            'cpf' => $this->generateCpf(),

            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indica que o endereço de e-mail do modelo deve ser não verificado.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Gera um número de CPF válido (apenas dígitos) para testes.
     * Este é um método auxiliar simples e não gera CPFs matematicamente válidos,
     * mas serve para popular o banco com o formato correto.
     *
     * @return string
     */
    private function generateCpf(): string
    {
        // Gera 11 dígitos aleatórios
        return implode('', array_map(fn() => random_int(0, 9), range(1, 11)));
    }
}
