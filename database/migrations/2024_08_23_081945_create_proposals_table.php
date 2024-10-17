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
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->string('proposal_id')->nullable();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('creator_wallet_address')->nullable();
            $table->string('title')->nullable();
            $table->string('type')->nullable();
            $table->longText('meta')->nullable();
            $table->dateTime('expiry')->nullable();
            $table->boolean('status')->default(0)->comment('0=pending,1=completed');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('proposals');
    }
};
