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
            $table->string('title', 100);
            $table->string('slug', 150)->unique();
            $table->text('primary_image')->nullable();
            $table->text('content')->nullable();
            $table->text('summary')->nullable();
            $table->json('specifications')->nullable();
            $table->json('images')->nullable();
            $table->boolean('is_active')->default(true);
            $table->tinyInteger('favorite')->default(0);
            $table->decimal('price', 16, 4)->default(0);
            $table->string('created_by', 100)->nullable();
            $table->string('updated_by', 100)->nullable();
            $table->timestamps();

            $table->index('title');
            $table->index('slug');
            $table->index('is_active');
        });

        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100);
            $table->string('slug', 150)->unique();
            $table->boolean('is_active')->default(true);
            $table->string('created_by', 100)->nullable();
            $table->string('updated_by', 100)->nullable();
            $table->timestamps();

            $table->index('title');
            $table->index('slug');
            $table->index('is_active');
        });

        Schema::create('product_has_categories', function (Blueprint $table) {
            $table->foreignId('product_id')->constrained('products')->onDelete('cascade');
            $table->foreignId('category_id')->constrained('product_categories')->onDelete('cascade');
            $table->index(['product_id', 'category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_has_categories');
        Schema::dropIfExists('product_categories');
        Schema::dropIfExists('products');
    }
};
