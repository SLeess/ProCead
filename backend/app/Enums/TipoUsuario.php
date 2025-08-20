<?php

namespace App\Enums;

use BenSampo\Enum\Contracts\LocalizedEnum;
use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class TipoUsuario extends Enum implements LocalizedEnum
{
    // const CURSO = 0;
    // const DISCIPLINA = 1;
    // const GERAL = 2;

    const USUARIO = 0;

    const MODERADOR = 1;

    const ADMINISTRADOR = 2;

    public static function getEnumOnArray()
    {
        for ($i = 0; $i < count(TipoUsuario::getInstances()); $i++) {
            $array[] = TipoUsuario::getDescription($i);
        }

        return $array;
    }
}
