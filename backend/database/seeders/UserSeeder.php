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
            'nome' => 'Admin User',
            'email' => 'asd@asd.com',
            'cpf' => '20745630006',
            'password' => Hash::make('asdasdasd'), // Use a secure password
        ]);
        // User::create([
        //     'nome' => 'Cotas User',
        //     'email' => 'cotas@asd.com',
        //     'cpf' => '94692719044',
        //     'password' => Hash::make('asdasdasd'), // Use a secure password
        // ]);
    }
}
