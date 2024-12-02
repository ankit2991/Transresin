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
        Schema::table('products', function (Blueprint $table) {
            $table->text("instruction_description")->nullable()->after("hsn_code_id");
            $table->string("instruction_image")->nullable()->after("instruction_description");
            $table->json("faqs")->nullable()->after("instruction_image");
            $table->json("videos")->nullable()->after("faqs");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['instruction_description', 'instruction_image', 'faqs', 'videos']);
        });
    }
};
