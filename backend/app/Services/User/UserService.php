<?php

namespace App\Services\User;

use App\Http\Resources\Admin\UserResource;
use App\Http\Resources\UserDataPermissionsAndRoles;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserService implements \App\Interfaces\User\IUserService{
    public function getProfileData(User $user): UserResource
    {
        // Simplesmente retorna o usuário. Poderia carregar relações aqui se necessário.
        // ex: $user->load('enderecos');
        return UserResource::make($user);
    }

    public function updateProfile(User $user, array $data): UserResource
    {
        DB::beginTransaction();

        try {
            // O método fill preenche os atributos em massa de forma segura
            $user->fill($data);
            // $user->update($data);
            $user->save();
            DB::commit();

            return UserResource::make($user);
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }

    public function getUserDataPermissions(User $user): UserDataPermissionsAndRoles
    {
        // Reutiliza o seu Resource, o que é uma ótima prática.
        return UserDataPermissionsAndRoles::make($user);
    }

    public function admin_userRegister(array $data): string
    {

        DB::beginTransaction();
        try {
            User::create(array_merge($data, ['password' => Str::password()]));
            DB::commit();
            return "Usuário cadastrado com sucesso";
        } catch (Exception $e) {
            DB::rollBack();
            throw new Exception($e->getMessage());
        }
    }
}
