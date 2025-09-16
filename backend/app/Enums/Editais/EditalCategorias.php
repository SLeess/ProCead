<?php

namespace App\Enums\Editais;

enum EditalCategorias: string
{
    case NÃO_POSSUI = 'NÃO_POSSUI';
    case CATEGORIAS_GERAIS = 'CATEGORIAS_GERAIS';
    case CATEGORIAS_ESPECIFICAS_POR_VAGA = 'CATEGORIAS_ESPECIFICAS_POR_VAGA';

    /**
     * Retorna a descrição traduzida para o caso do Enum.
     */
    public function getLabel(): string
    {
        return trans("enums.edital_categorias.{$this->value}");
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
