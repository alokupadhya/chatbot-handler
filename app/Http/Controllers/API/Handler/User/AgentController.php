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
                $admin = Auth::user();
                $usr = new User();
                $now = time();
                $data = [
                    'first_name' => $request->first_name,
                    'last_name' => $request->last_name,
                    'role_id' => DB::table('user_roles')->where('type','agent')->value('id'),
                    'password' => Hash::make($now),
                    'email' => $request->email,
                ];
                // $usr->create($data);
                $response = ['msg' => 'Data '.RESPONSE_ADD_ROWS, 'status' => 1];
		    	return response($response, RESPONSE_SUCCESS);
                // Mail::to($data['email'])->send(new AgentPassword($data));
                // DB::commit();
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
    public function show(User $user)
    {
        //
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        //
    }
}
