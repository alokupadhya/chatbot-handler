<?php

namespace App\Http\Controllers\API\Chatbox;

use App\ChatboxUsers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
class VisitedUsersController extends Controller
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
        try
    	{
    		$validator = Validator::make($request->all(), [ 
                'full_name'	=> 'required',
                'email'	=> 'required',
                'mobile'	=> 'required',
	        ]);
			
			if ($validator->fails()) 
			{ 
				$response = ['msg' => $validator->errors(), 'status' => 1];
			    return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);            
			}
			else
			{
		    	$new_visited_user = [
		    		'full_name' 	=> $request->full_name,
		    		'email'		=> $request->email,
		    		'mobile'	=> $request->mobile
		    	];
		    	ChatboxUsers::create($new_visited_user);
		    	$response = ['msg' => 'Data '.RESPONSE_ADD_ROWS, 'status' => 1];
		    	return response($response, RESPONSE_SUCCESS);
	    	}
    	}
    	catch (\Exception $e) 
		{
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
    }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  \App\ChatboxUsers  $chatboxUsers
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show(ChatboxUsers $chatboxUsers)
    // {
    //     //
    // }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  \App\ChatboxUsers  $chatboxUsers
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(Request $request, ChatboxUsers $chatboxUsers)
    // {
    //     //
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  \App\ChatboxUsers  $chatboxUsers
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy(ChatboxUsers $chatboxUsers)
    // {
    //     //
    // }
}
