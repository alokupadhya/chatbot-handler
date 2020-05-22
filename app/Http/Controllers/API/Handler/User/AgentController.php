<?php

namespace App\Http\Controllers\API\Handler\User;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\DB;
use Auth;
use Hash;

class AgentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try
    	{
            $validator = Validator::make($request->all(), [ 
                'first_name'    => 'required',
                'last_name' => 'required',
                'email' => 'required|email|unique:users,email|max:255',
            ]);
            
            if ($validator->fails()) 
            { 
                $response = ['msg' => $validator->errors(), 'status' => 1];
                return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);            
            }
            else
            {
                $now = time();
                $data = [
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'role_id' => DB::table('user_roles')->where('type','agent')->value('id'),
                    'password' => Hash::make($now),
                    'email' => $request->email,
                ];
                User::create($data);
                DB::commit();
                $response = ['msg' => 'Data '.RESPONSE_ADD_ROWS, 'status' => 1];
		    	return response($response, RESPONSE_SUCCESS);
            }
        }
        catch (\Exception $e) 
		{
            DB::rollback();
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        try 
    	{
            $usr = User::select('id', 'first_name', 'last_name','email','status','updated_at')->where('role_id',DB::table('user_roles')->where('type','agent')->value('id'))->get();
            $deactive = User::where('role_id',DB::table('user_roles')->where('type','agent')->value('id'))->where('status',0)->get();
            $active = User::where('role_id',DB::table('user_roles')->where('type','agent')->value('id'))->where('status',1)->get();
              		
            $response = ['msg' => RESPONSE_ALL_ROWS ,'records'=>$usr, 'deactive'=>count($deactive), 'active'=>count($active), 'status'=> 1];
		    return response($response, RESPONSE_SUCCESS);
    	} 
    	catch (\Exception $e) 
    	{
    		return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
    	}
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        DB::beginTransaction();
        try
    	{
            $validation = [
                'first_name'    => 'required',
                'last_name' => 'required',
            ];
            $data = [
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
            ];
            $usr = User::findorFail($request->id);
            if($usr->email != $request->email){
                $now = time();
                $validation['email'] = 'required|email|unique:users,email|max:255';
                $data['email'] = $request->email;
                $data['password'] = Hash::make($now);
            }
            else{
                $validation['email'] = 'required|email';
            } 
            
            $validator = Validator::make($request->all(), $validation);
            
            if ($validator->fails()) 
            { 
                $response = ['msg' => $validator->errors(), 'status' => 1];
                return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);            
            }
            else
            {
                $usr->update($data);
                DB::commit();
                $response = ['msg' => 'Data '.RESPONSE_EDIT_ROWS, 'status' => 1];
		    	return response($response, RESPONSE_SUCCESS);
            }
        }
        catch (\Exception $e) 
		{
            DB::rollback();
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function updateStatus(Request $request)
    {
        DB::beginTransaction();
        try
    	{
            User::where('id', $request->id)->update([
                'status'=>!$request->status,
            ]);
            DB::commit();
            $response = ['msg' => 'Data '.RESPONSE_EDIT_ROWS, 'status' => 1];
            return response($response, RESPONSE_SUCCESS);
            
        }
        catch (\Exception $e) 
		{
            DB::rollback();
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
    }
}
