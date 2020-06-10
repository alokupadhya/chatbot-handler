<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'role_id',
        'temp_password',
        'temp_password_exp',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'temp_password', 'temp_password_exp', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role(){
        return $this->hasOne(UserRoles::class,'id','role_id');
    }

    public function workStatus(){
        return $this->hasOne(UserWorkStatus::class,'id','work_status_id');
    }

    public function isAdmin(){
        return ($this->role && $this->role->type=='admin')?true:false;
    }

    public function isAgent(){
        return ($this->role && $this->role->type=='agent')?true:false;
    }
}
