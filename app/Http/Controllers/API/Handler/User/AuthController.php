<?php

namespace App\Http\Controllers\API\Handler\User;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Hash;
use App\Mail\Account\ForgotPassword as ForgotPassword;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
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
		        if (Hash::check($request->password, $user->password)) 
		        {
		            $token = $user->createToken('Laravel Password Grant Client')->accessToken;
		            $response = ['token' => $token];
		            return response($response, RESPONSE_SUCCESS);
		        } 
		        else 
		        {
					$now = (new \DateTime('now'))->format('Y-m-d H:i:s');
					$exp_time = date('Y-m-d H:i:s', strtotime($user->temp_password_exp));

					if (Hash::check($request->password, $user->temp_password) && ($now < $exp_time)) 
					{
						$token = $user->createToken('Laravel Password Grant Client')->accessToken;
						$response = ['token' => $token];
						return response($response, RESPONSE_SUCCESS);
					}
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

	/**
     * Logout user
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
	public function forgotPassword (Request $request) 
	{
        DB::beginTransaction();
		try 
		{
			$usr = User::where('email',$request->email)->firstOrFail();
			$date = (new \DateTime('now'))->format('Y-m-d H:i:s');
			$new_date = date('Y-m-d H:i:s', strtotime('+4 hours', strtotime($date)));

			$data = [
				'first_name' => $usr->first_name,
				'email' => $usr->email,
				'temp_password' => time(),
				'temp_password_exp' => $new_date,
			];
			\Mail::to($data['email'])->send(new ForgotPassword($data));

			$data['temp_password'] = \Hash::make($data['temp_password']);
			$usr->update($data);
			$response = [
				'msg' => 'Your temporary pasword is sent to the email.',
				'status' => 1
			];
			DB::commit();
		    return response($response, RESPONSE_SUCCESS);
		} 
		catch (\Exception $e) 
		{
            DB::rollback();
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
	}
}