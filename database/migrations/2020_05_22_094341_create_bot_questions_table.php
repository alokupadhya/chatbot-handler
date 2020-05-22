<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBotQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bot_questions', function (Blueprint $table)
        {
            $table->integer('id')->autoIncrement()->unsigned();
            $table->integer('bot_option_id')->unsigned()->nullable();
            $table->string('qa');
            $table->integer('type')->default('1');// 0 - ques //1 - ans
            $table->integer('status')->default('1');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
        });

        Schema::create('bot_options', function (Blueprint $table) {
            $table->integer('id')->autoIncrement()->unsigned();
            $table->integer('bot_question_id')->unsigned();
            $table->string('option');
            $table->integer('status')->default('1');
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP'));
            $table->foreign('bot_question_id')->references('id')->on('bot_questions');
            $table->dropForeign('bot_options_bot_question_id_foreign');

        });

        Schema::table('bot_questions', function(Blueprint $table)
        {
            $table->foreign('bot_option_id')->references('id')->on('bot_options');
            $table->dropForeign('bot_questions_bot_option_id_foreign');

        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bot_questions');
        Schema::dropIfExists('bot_options');
    }
}
