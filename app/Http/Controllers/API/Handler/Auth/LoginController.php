<?php

namespace App\Http\Controllers\API\Handler\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    /**
     * Login user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
    */
    public function login (Request $request) 
	{
		try 
		{
			$user = User::where('email', $request->email)->where('role_id', $request->role_id)->first();
		    if ($user) 
		    {
		        if (\Hash::check($request->password, $user->password)) 
		        {
		            $token = $user->createToken('Laravel Password Grant Client')->accessToken;
		            $response = ['token' => $token];
		            return response($response, RESPONSE_SUCCESS);
		        } 
		        else 
		        {
		            $response = "Unauthorized Access";
		            return response($response, RESPONSE_UNAUTHORIZED);
		        }
		    } 
		    else 
		    {
		        $response = 'Unauthorized Access';
		        return response($response, RESPONSE_UNAUTHORIZED);
		    }
		} 
		catch (\Exception $e) 
		{
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}    
	}

	/**
     * Logout user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
	public function logout (Request $request) 
	{
		try 
		{
			$token = $request->user()->token();
		    $token->revoke();

		    $response = 'You have been succesfully logged out!';
		    return response($response, RESPONSE_SUCCESS);
		} 
		catch (\Exception $e) 
		{
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
	}
}