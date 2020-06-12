<?php

namespace App\Http\Controllers\API\Chatbox;

use App\Http\Controllers\Controller;
use App\RequestQuestion;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Validator;


class RequestQuestionController extends Controller
{

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
                'email'	=> 'required',
                'question'	=> 'required',
	        ]);
			
			if ($validator->fails()) 
			{ 
				$response = ['msg' => $validator->errors(), 'status' => 1];
			    return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);            
			}
			else
			{
		    	$requested_question = [
		    		'email'		=> $request->email,
		    		'question'	=> $request->question
		    	];
		    	RequestQuestion::create($requested_question);
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
     * @param  \App\RequestQuestion  $requestQuestion
     * @return \Illuminate\Http\Response
     */
    public function showRecent()
    {
        try
    	{
            $rq = RequestQuestion::latest()->take(5)->get();
            $response = ['msg' => 'Data '.RESPONSE_DELETE_ROWS, 'records'=>$rq, 'status' => 1];
            return response($response, RESPONSE_SUCCESS);
    	}
    	catch (\Exception $e) 
		{
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\RequestQuestion  $requestQuestion
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        try
    	{
            $rq = RequestQuestion::latest()->get();
            $response = ['msg' => 'Data '.RESPONSE_DELETE_ROWS, 'records'=>$rq, 'status' => 1];
            return response($response, RESPONSE_SUCCESS);
    	}
    	catch (\Exception $e) 
		{
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\RequestQuestion  $requestQuestion
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        DB::beginTransaction();
        try
    	{
            $rq = RequestQuestion::find($request->id);
            $rq->delete();
            DB::commit();
            $response = ['msg' => 'Data '.RESPONSE_DELETE_ROWS, 'status' => 1];
            return response($response, RESPONSE_SUCCESS);
    	}
    	catch (\Exception $e) 
		{
            DB::rollback();
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
    }
}
