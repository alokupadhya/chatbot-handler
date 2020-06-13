<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_records', function (Blueprint $table) {
            $table->integer('id')->autoIncrement()->unsigned();
            $table->integer('agent_chat_sessions_id')->unsigned();
            $table->string('message');
            $table->integer('who')->unsigned(); //0 agent, 1 user
            $table->timestamps();
            $table->foreign('agent_chat_sessions_id')->references('id')->on('agent_chat_sessions');
            $table->dropForeign('chat_records_agent_chat_sessions_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat_records');
    }
}
