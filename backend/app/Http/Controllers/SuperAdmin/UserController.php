<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Resources\Admin\UserCollection;
use App\Models\User;
use Illuminate\Http\Request;
use Nette\NotImplementedException;
use Symfony\Component\HttpFoundation\Response;

class UserController extends __SuperAdminController
{
    public function index()
    {
        try {
            return $this->sendResponse(
                UserCollection::make(User::all()),
                "Usuários enviados com sucesso."
            );
        } catch (\Exception $e) {
            return $this->sendError("Erro inesperado.", [0 => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function update()
    {
        throw new NotImplementedException("update UserController");
    }
    public function delete()
    {
        throw new NotImplementedException("delete UserController");
    }
    public function destroy()
    {
        throw new NotImplementedException("destroy UserController");
    }
}
