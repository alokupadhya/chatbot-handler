<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChatRecords extends Model
{
    protected $table = 'chat_records';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'agent_chat_sessions_id', 'message', 'who'
    ];
}
