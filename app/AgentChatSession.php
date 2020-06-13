<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AgentChatSession extends Model
{
    protected $table = 'agent_chat_sessions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'chatbox_user_id',
        'session_expire_at',
        'ended',
        'session_token'
    ];

    public function chats()
    {
        return $this->hasMany('App\ChatRecords');
    }
}
