<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'uuid' => env("APP_ADMIN_UUID"),
            'nome' => env("APP_ADMIN_NAME"),
            'email' => env("APP_ADMIN_EMAIL"),
            'cpf' => env("APP_ADMIN_CPF"),
            'password' => Hash::make(env("APP_ADMIN_PASSWORD")), // Use a secure password
        ]);
    }
}
