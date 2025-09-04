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
        Schema::create('anexos', function (Blueprint $table) {
            // dados.
            $table->id();
            $table->string('nome');
            $table->text('formato');

            // dados que serão inseridos depois.
            $table->string('caminho')->nullable();
            $table->foreignId('edital_id')->nullable()->references('id')->on('editais');
            $table->foreignId('modalidade_id')->nullable()->references('id')->on('modalidades');
            $table->foreignId('vaga_id')->nullable()->references('id')->on('vagas');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anexos');
    }
};
