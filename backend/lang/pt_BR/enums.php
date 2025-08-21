<?php

use App\Enums\TipoUsuario;

return [
    TipoUsuario::class => [
        TipoUsuario::USUARIO => 'Usuário',
        TipoUsuario::MODERADOR => 'Moderador',
        TipoUsuario::ADMINISTRADOR => 'Administrador',
    ],
];
