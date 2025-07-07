<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[
            \Spatie\Permission\PermissionRegistrar::class
        ]->forgetCachedPermissions();

        // create permissions
        $arrayOfPermissionNames = [
            "editar-inscricoes",
            "visualizar-inscricoes",
            "editar-cotas",
            "visualizar-cotas",
        ];
        $permissions = collect($arrayOfPermissionNames)->map(function (
            $permission
        ) {
            return ["name" => $permission, "guard_name" => "web"];
        });
        foreach ($arrayOfPermissionNames as $permission) {
            Permission::create(["name" => $permission, "guard_name" => "web"]);
        }
        // Permissions::insert($permissions->toArray());

        // create role & give it permissions
        Role::create(["name" => "admin"])->givePermissionTo(Permission::all());
        Role::create(["name" => "candidato"])->givePermissionTo(['editar-cotas',"editar-cotas"]);

        // Assign roles to users (in this case for user id -> 1 & 2)
        $user = User::first();
        if ($user) {
            $user->assignRole('admin');
        }
        $user = User::where('email', 'cotas@asd.com')->first();
        if ($user) {
            $user->assignRole('candidato');
        }
        // $cotasUser = User::where('email','cotas@cotas.com')->first();
        // if($cotasUser) {
        //     $cotasUser->assignRole('cotas');
        // }
    }
}
