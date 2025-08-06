<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\API\APIController;
use App\Http\Resources\Admin\UserCollection;
use App\Http\Resources\Admin\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Nette\NotImplementedException;

class ManageUserController extends APIController
{
    public function index()
    {
        $users = User::paginate(15);
        return $this->sendResponse(UserCollection::make($users), 'Lista de usuários recuperada com sucesso.');
    }
    public function show(User $user)
    {
        throw new NotImplementedException("Não implementado");
        return $this->sendResponse(UserResource::make($user), 'Dados do Usuários recuperados com sucesso.');
    }
    public function update(Request $request, User $user)
    {
        // dd($user);
        throw new NotImplementedException("Não implementado");
        return $this->sendResponse(UserCollection::make($users), 'Dados do Usuários atualizados com sucesso.');
    }

    // public function store(Request $request) { /* ... */ }
    // public function show(User $user) { return UserResource::make($user); }
    // public function update(Request $request, User $user) { /* ... */ }
    // public function destroy(User $user) { /* ... */ }
}
