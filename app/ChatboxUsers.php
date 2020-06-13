<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChatboxUsers extends Model
{
    protected $table = 'chatbox_users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'full_name', 'email', 'mobile'
    ];

    public function chatSession()
    {
        return $this->hasOne('App\AgentChatSession');
    }
}
