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
        // Foi feita uma relação N * N para evitar a repetição dos tipos de avaliação em todas as
        // modalidades, já que os mesmos são globais.
        // Desse modo também respeitamos o princípio Open-Closed, evitando os problemas de modalidade
        // do sistema antigo
        
        Schema::create('tipos_avaliacao', function (Blueprint $table) {
            $table->id();
            $table->string('tipo');
        });
        Schema::create('modalidades', function (Blueprint $table) {
            $table->id();
            $table->string('sigla');
            $table->string('descricao');
            $table->foreignId('edital_id')->references('id')->on('editais');
            $table->timestamps();
        });
        Schema::create('modalidade_tipo_avaliacao', function (Blueprint $table) {
            $table->id();
            $table->foreignId('modalidade_id')->references('id')->on('modalidades');
            $table->foreignId('tipo_avaliacao_id')->references('id')->on('tipos_avaliacao');
            $table->unique(['modalidade_id','tipo_avaliacao_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modalidades');
        Schema::dropIfExists('tipos_avaliacao');
    }
};
