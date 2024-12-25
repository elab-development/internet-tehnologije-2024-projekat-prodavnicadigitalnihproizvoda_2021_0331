<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pictures', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('low_res_path')->default("images/low_res/1l.png");
            $table->string('high_res_path')->default("images/high_res/1.png");
            $table->decimal('price', 10, 2);
            $table->unsignedBigInteger('downloads')->default(0);
            $table->json('tags')->nullable();
            $table->foreignId('category_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pictures');
    }
};
