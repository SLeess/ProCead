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
        Schema::create('datas', function (Blueprint $table) {
            // info
            $table->id();

            // datas basicas
            $table->dateTime('start_inscricao');
            $table->dateTime('end_inscricao');
            $table->dateTime('start_alteracao_dados');
            $table->dateTime('end_alteracao_dados');
            $table->dateTime('resultado_preliminar');
            $table->dateTime('resultado_final');

            // datas de avaliacao
            $table->dateTime('start_avaliacao_socioeconomico')->nullable();
            $table->dateTime('end_avaliacao_socioeconomico')->nullable();
            $table->dateTime('start_avaliacao_pcd')->nullable();
            $table->dateTime('end_avaliacao_pcd')->nullable();
            $table->dateTime('start_avaliacao_hid')->nullable();
            $table->dateTime('end_avaliacao_hid')->nullable();
            $table->dateTime('start_avaliacao_etnica')->nullable();
            $table->dateTime('end_avaliacao_etnica')->nullable();
            $table->dateTime('start_avaliacao_genero')->nullable();
            $table->dateTime('end_avaliacao_genero')->nullable();

            // etc
            // $table->unsignedBigInteger('edital_id');
            // $table->foreign('edital_id')->references('id')->on('editais');
            $table->foreignId('edital_id')->unique()->constrained('editais')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('datas');
    }
};
