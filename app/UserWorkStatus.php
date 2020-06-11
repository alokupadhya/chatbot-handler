<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserWorkStatus extends Model
{
    public $table = "user_work_status";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    
    protected $fillable = [
        'type',
    ];
}
