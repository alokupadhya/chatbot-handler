<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChatboxUsers extends Model
{
    protected $table = 'chatbox_users';
    protected $fillable = [
        'full_name', 'email', 'mobile'
    ];
}
