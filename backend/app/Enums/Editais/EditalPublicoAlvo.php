<?php

namespace App\Enums\Editais;

enum EditalPublicoAlvo: string
{
    case ALUNO = 'ALUNO';
    case PROFESSOR = 'PROFESSOR';
    case TUTOR = 'TUTOR';
    case COORDENADOR_CURSO_GRADUACAO_LICENCIATURA = 'COORDENADOR_CURSO_GRADUACAO_LICENCIATURA';
    case COORDENADOR_CURSO_GRADUACAO_TECNOLOGO = 'COORDENADOR_CURSO_GRADUACAO_TECNOLOGO';
    case COORDENADOR_CURSO_POS_GRADUACAO_ESPECIALIZACAO = 'COORDENADOR_CURSO_POS_GRADUACAO_ESPECIALIZACAO';
    case COORDENADOR_TUTORIA = 'COORDENADOR_TUTORIA';
    case COORDENADOR_GERAL_UAB = 'COORDENADOR_GERAL_UAB';
    case COORDENADOR_ADJUNTO_UAB = 'COORDENADOR_ADJUNTO_UAB';
    case ESTAGIARIO = 'ESTAGIARIO';

    /**
     * Retorna a descrição traduzida para o caso do Enum.
     */
    public function getLabel(): string
    {
        return trans("enums.edital_publico_alvo.{$this->value}");
    }

    /**
     * Retorna um array formatado para selects de formulário no frontend.
     * Ex: [ ['value' => 'ALUNO', 'label' => 'Aluno'], ... ]
     */
    public static function toSelectArray(): array
    {
        return array_map(
            fn($case) => ['value' => $case->value, 'label' => $case->getLabel()],
            self::cases()
        );
    }

    /**
     * Retorna um array formatado para selects de formulário no frontend.
     * Ex: [ ['Aluno' => 'ALUNO'], ... ]
     */
    public static function toEnumMapArray(): array
    {
        $map = [];
        foreach (self::cases() as $case) {
            $map[$case->getLabel()] = $case->value;
        }
        return $map;
    }

    /**
     * Retorna um array formatado para selects de formulário no frontend.
     * Ex: ['Aluno', 'Professor', ... ]
     */
    public static function toLabelsArray(): array
    {
        return array_map(
            fn($case) => $case->getLabel(),
            self::cases()
        );
    }
}
