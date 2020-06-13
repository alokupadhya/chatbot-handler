<?php

namespace App\Http\Controllers\API\Chatbox;

use App\ChatboxUsers;
use App\AgentChatSession;
use App\ChatRecords;
use Hash;
use App\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
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
        DB::beginTransaction();
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
                $c = 0;
                while(true)
                {
                    $c = $c+1;
                    $agent = User::whereHas('role', function ($query) {
                        $query->where('type', 'agent');
                    })->whereHas('workStatus', function ($query) {
                        $query->where('type', 'online');
                    })->get();
                    if(count($agent) > 0){
                        $assigned_agent = $agent->random(1)->first();
                        $nus = ChatboxUsers::create($new_visited_user);
                        $date = (new \DateTime('now'))->format('Y-m-d H:i:s');
			            $expire_at = date('Y-m-d H:i:s', strtotime('+59 minutes', strtotime($date)));
                        $_token = uniqid().time();
                        $data = [
                            'user_id'=>$assigned_agent->id,
                            'chatbox_user_id'=>$nus->id,
                            'session_expire_at'=>$expire_at,
                            'session_token'=>$_token,
                        ];
                        $d = [
                            'work_status_id'=>3,
                        ];
                        $assigned_agent->update($d);
                        $session = AgentChatSession::create($data);
                        $chat_data = [
                            'agent_chat_sessions_id' => $session->id,
                            'message' => "Hi! this is ".$assigned_agent->first_name.". How may i help you?",
                            'who'=>0,
                        ];       
                        ChatRecords::create($chat_data);
                        DB::commit();
                        $response = ['msg' => 'Your session expire at '.$expire_at, 'records'=>$_token, 'status' => 1];
                        return response($response, RESPONSE_SUCCESS);
                    }
                    if($c == 5){
                        $response = ['msg' => 'All agents are busy, Please try after some time', 'status' => 2];
                        return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
                    }
                    sleep(5);
                }
                
	    	}
    	}
    	catch (\Exception $e) 
		{
            DB::rollback();
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
    }
}
