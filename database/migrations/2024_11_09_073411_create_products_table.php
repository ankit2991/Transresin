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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string("name");
            $table->string("slug")->unique();
            $table->string('image')->nullable();
            $table->longText('description')->nullable();
            $table->longText('search_keywords')->nullable();
            // Foreign Keys
            $table->foreignId("category_id")->nullable()->constrained()->onDelete('SET NULL');
            $table->foreignId("sub_category_id")->nullable()->constrained('categories')->onDelete('SET NULL');
            $table->foreignId("industry_category_id")->nullable()->constrained()->onDelete('SET NULL');
            $table->foreignId("sub_industry_category_id")->nullable()->constrained('industry_categories')->onDelete('SET NULL');
            $table->foreignId("application_id")->nullable()->constrained()->onDelete('SET NULL');
            $table->foreignId("sub_application_id")->nullable()->constrained('applications')->onDelete('SET NULL');
            $table->foreignId("brand_id")->nullable()->constrained()->onDelete('SET NULL');
            $table->foreignId("hsn_code_id")->nullable()->constrained()->onDelete('SET NULL');
            // End Foreign Keys
            $table->double("regular_price");
            $table->double("discount");
            $table->double("trade_price");
            $table->string('seo_title')->nullable();
            $table->text('seo_keywords')->nullable();
            $table->text('seo_description')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
