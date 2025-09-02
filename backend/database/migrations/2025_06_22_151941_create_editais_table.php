<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('editais', function (Blueprint $table) {
            $table->id();

            $table->string('referencia')->unique();
            $table->string('descricao');

            // $table->string('publico_alvo');
            $table->enum('publico_alvo',
            [
                'ALUNO',
                'PROFESSOR',
                'TUTOR',
                'COORDENADOR_CURSO_GRADUACAO_LICENCIATURA',
                'COORDENADOR_CURSO_GRADUACAO_TECNOLOGO',
                'COORDENADOR_CURSO_POS_GRADUACAO_ESPECIALIZACAO',
                'COORDENADOR_TUTORIA',
                'COORDENADOR_GERAL_UAB',
                'COORDENADOR_ADJUNTO_UAB',
                'ESTAGIARIO',
            ])
            ->default('ALUNO');

            // $table->string('formato_notas');
            $table->enum('formato_notas', [
                'SOMA_CRITERIOS',
                'MEDIA_CRITERIOS',
                'ORDEM_DE_INSCRICAO',
            ])
            ->default('SOMA_CRITERIOS');

            // $table->string('tipo_inscricao');
            $table->enum('tipo_inscricao',
                [
                    'CURSO',
                    'CARGO',
                    'DISCIPLINA',
                    'GERAL',
                ])
            ->default('CURSO');

            $table->integer('max_itens_inscricao');
            $table->integer('max_itens_posse');

            $table->boolean('remanejamento');

            // $table->string('categorias');
            $table->enum('categorias', [
                'NÃO_POSSUI',
                'CATEGORIAS_GERAIS',
                'CATEGORIAS_ESPECIFICAS_POR_VAGA',
            ])
            ->default('NÃO_POSSUI');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('editais');
    }
};
