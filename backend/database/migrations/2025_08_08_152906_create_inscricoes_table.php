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
        Schema::create('inscricoes', function (Blueprint $table) {
            // informações básicas
            $table->id();
            $table->string('nome_completo');
            $table->string('cpf', 11);
            $table->string('email');
            $table->date('data_nascimento');
            $table->string('telefone', 11);
            $table->string('genero');
            $table->string('nome_social')->nullable();
            $table->string('identidade_genero')->nullable();
            $table->string('identidade');
            $table->string('estado_civil');
            $table->string('uf_naturalidade')->nullable();
            $table->string('naturalidade');
            $table->string('nacionalidade');

            // endereço
            $table->string('cep');
            $table->string('rua');
            $table->string('bairro');
            $table->string('cidade');
            $table->string('uf');
            $table->string('numero')->nullable();
            $table->string('complemento')->nullable();

            // etc
            $table->boolean('termo_responsabilidade');
            $table->unsignedBigInteger('edital_id');
            $table->foreign('edital_id')->references('id')->on('editais');
            $table->string('status')->nullable();
            $table->string('motivo')->nullable();
            $table->uuid('user_uuid');
            $table->foreign('user_uuid')->references('uuid')->on('users');

            $table->timestamps();
            $table->unique(['user_uuid', 'edital_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inscricoes');
    }
};
