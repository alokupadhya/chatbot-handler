<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BotOption extends Model
{
    protected $table = 'bot_options';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'bot_question_id', 'option', 'status'
    ];

    public function nextNode(){
        return $this->hasOne(BotQuestion::class,'id','bot_question_id');
    }
}
