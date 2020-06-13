<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAgentChatSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agent_chat_sessions', function (Blueprint $table) {
            $table->integer('id')->autoIncrement()->unsigned();
            $table->integer('user_id')->unsigned();
            $table->integer('chatbox_user_id')->unsigned();
            $table->timestamp('session_expire_at');
            $table->integer('ended')->unsigned()->default('0');
            $table->string('session_token');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('chatbox_user_id')->references('id')->on('chatbox_users');
            $table->dropForeign('agent_chat_sessions_user_id_foreign');
            $table->dropForeign('agent_chat_sessions_chatbox_user_id_foreign');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('agent_chat_sessions');
    }
}
