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
        Schema::create('contextos', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('edital')->unique();
            $table->string('nome_edital');
            $table->string('publico_alvo');
            $table->string('formato_notas');
            $table->string('tipo_inscricao');
            $table->integer('max_itens_inscricao');
            $table->integer('max_itens_posse');
            $table->boolean('remanejamento');
            $table->string('categorias');
            $table->string('tipo_avaliacao_reserva_vagas');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contextos');
    }
};
