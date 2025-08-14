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
        Schema::create('modalidades', function (Blueprint $table) {
            // info
            $table->id();
            $table->string('sigla', length: 10);
            $table->tinyText('descricao');

            // etc
            $table->foreignId('edital_id')->references('id')->on('editais');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('modalidades');
    }
};
