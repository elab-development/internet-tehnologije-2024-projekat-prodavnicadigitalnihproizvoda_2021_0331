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
        
        Schema::table('pictures', function (Blueprint $table) {
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
        });

        
        Schema::table('carts', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('picture_id')->constrained()->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tables', function (Blueprint $table) {
            Schema::table('pictures', function (Blueprint $table) {
                $table->dropForeign(['category_id']);
                $table->dropColumn('category_id');
            });
    
            Schema::table('carts', function (Blueprint $table) {
                $table->dropForeign(['user_id']);
                $table->dropForeign(['picture_id']);
                $table->dropColumn(['user_id', 'picture_id']);
            });
        });
    }
};
