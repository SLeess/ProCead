<?php

return [
    'models' => [
        'App\Models\Edital' => 'Edital',
        'App\Models\Admin' => 'Admin',
        'App\Models\Campus' => 'Campus',
        'App\Models\CampusCurso' => 'Campus-curso',
        'App\Models\CampusCursoModalidade' => 'Vagas por Modalidade em cada Campus-curso',
        'App\Models\Contexto' => 'Contexto',
        'App\Models\Curso' => 'Curso',
        'App\Models\Inscricao' => 'Inscrição',
        'App\Models\Modalidade' => 'Modalidade',
        'App\Models\OpcaoProva' => 'Opção de prova',
        'App\Models\Recurso' => 'Recurso',
        'App\Models\RecursoProva' => 'Recurso contra a prova',
        'App\Models\CursoInscricao' => 'Cursos inscritos',
        'App\Models\DisciplinaInscricao' => 'Disciplinas inscritas',
        'App\Models\Resultado' => 'Resultado',
        'App\Models\Situacao' => 'Situação',
        'App\Models\Role' => 'Perfil',
        'App\Models\Permission' => 'Permissão',
        'App\Models\User' => 'Usuário',
        'App\Models\Chamada' => 'Chamada',
        'App\Models\ExtratoNota' => 'Extrato de nota',
        'App\Models\PreMatricula' => 'Matrícula',
        'App\Models\Classificacao' => 'Classificação',
    ],
    'model_not_found' => 'Não foi possível encontrar o registro do :model solicitado.',
    'tipo_usuario' => [
        'App\Models\User' => 'Usuário',
    ],
];
