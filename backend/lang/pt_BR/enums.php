<?php

use App\Enums\TipoUsuario;

return [
    TipoUsuario::class => [
        TipoUsuario::USUARIO => 'Usuário',
        TipoUsuario::MODERADOR => 'Moderador',
        TipoUsuario::ADMINISTRADOR => 'Administrador',
    ],

    'edital_publico_alvo' => [
        'ALUNO' => 'Aluno',
        'PROFESSOR' => 'Professor',
        'TUTOR' => 'Tutor',
        'COORDENADOR_CURSO_GRADUACAO_LICENCIATURA' => 'Coordenador de Curso de Graduação - Licenciatura',
        'COORDENADOR_CURSO_GRADUACAO_TECNOLOGO' => 'Coordenador de Curso de Graduação - Tecnólogo',
        'COORDENADOR_CURSO_POS_GRADUACAO_ESPECIALIZACAO' => 'Coordenador de Curso de Pós-Graduação - Especialização',
        'COORDENADOR_TUTORIA' => 'Coordenador de Tutoria',
        'COORDENADOR_GERAL_UAB' => 'Coordenador Geral da UAB',
        'COORDENADOR_ADJUNTO_UAB' => 'Coordenador Adjunto da UAB',
        'ESTAGIARIO' => 'Estagiário',
    ],

    'edital_formato_notas' => [
        'SOMA_CRITERIOS' => 'Soma da nota Final',
        'MEDIA_CRITERIOS' => 'Média da nota Final',
        'ORDEM_DE_INSCRICAO' => 'Ordem de Inscrição',
    ],

    'edital_tipo_inscricao' => [
        'CURSO' => 'Curso',
        'CARGO' => 'Cargo',
        'DISCIPLINA' => 'Disciplina',
        'GERAL' => 'Geral',
    ],

    'edital_categorias' => [
        'NÃO_POSSUI' => 'Não possui categorias',
        'CATEGORIAS_GERAIS' => 'Categorias Gerais',
        'CATEGORIAS_ESPECIFICAS_POR_VAGA' => 'Categorias específicas de cada Vaga',
    ],
];
