<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class RequestQuestion extends Model
{
    protected $table = 'request_questions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email', 'question'
    ];
}
