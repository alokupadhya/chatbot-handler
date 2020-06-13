<?php

namespace App\Http\Controllers\API\Chatbox;

use App\ChatboxUsers;
use App\AgentChatSession;
use App\ChatRecords;
use App\User;
use Hash;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Validator;

class ChatHandlerController extends Controller
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
        try {
            $validator = Validator::make($request->all(), [ 
                'message'	=> 'required',
            ]);
            if ($validator->fails()) 
			{ 
				$response = ['msg' => $validator->errors(), 'status' => 1];
			    return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);            
            }
            else {
                $ses = AgentChatSession::where('session_token',$request->session_token)->get();
                if(count($ses) > 0){
                    $ses = $ses->first();
                    $now = (new \DateTime('now'))->format('Y-m-d H:i:s');
                    $exp_time = date('Y-m-d H:i:s', strtotime($ses->session_expire_at));
                    if($ses->ended == 1){
                        $response = ['msg' => 'Session already ended', 'status' => 2];
                        return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
                    }
                    else if($now > $exp_time){
                        $data = [
                            'ended'=>1
                        ];
                        $ses->update($data);
                        DB::commit();
                        $response = ['msg' => 'Session expired.', 'status' => 2];
                        return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
                    }
                    else {
                        $data = [
                            'message'=>$request->message,
                            'who'=>1,
                            'agent_chat_sessions_id'=>$ses->id,
                        ];
                        ChatRecords::create($data);
                        DB::commit();
                        $response = ['msg' => 'Data '.RESPONSE_ADD_ROWS, 're' =>$ses, 'status' => 1];
                        return response($response, RESPONSE_SUCCESS);
                    }
                }
                $response = ['msg' => 'Session not found.', 'status' => 2];
                return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
            }
        } catch (\Exception $th) {
            DB::rollback();
			return response($th->getMessage(), RESPONSE_UNAUTHORIZED);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ChatRecords  $chatRecords
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $ses = AgentChatSession::where('session_token',$request->session_token)->get();
        if(count($ses) > 0){
            $ses = $ses->first();
            $now = (new \DateTime('now'))->format('Y-m-d H:i:s');
            $exp_time = date('Y-m-d H:i:s', strtotime($ses->session_expire_at));
            if($ses->ended == 1){
                $response = ['msg' => 'Session already ended', 'status' => 2];
                return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
            }
            else if($now > $exp_time){
                $data = [
                    'ended'=>1
                ];
                $ses->update($data);
                DB::commit();
                $response = ['msg' => 'Session expired.', 'status' => 2];
                return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
            }
            else {
                $assigned_agent = User::where('id',$ses->user_id)->get()->first();
                $chats = ChatRecords::where('agent_chat_sessions_id',$ses->id)->get();
                $response = ['msg' => 'Data '.RESPONSE_ADD_ROWS, 'records' =>[$chats,$assigned_agent->first_name], 'status' => 1];
                return response($response, RESPONSE_SUCCESS);
            }
        }
        $response = ['msg' => 'Session not found.', 'rec' =>$request, 'status' => 2];
        return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
    }

    public function endSession(Request $request)
    {
        $ses = AgentChatSession::where('session_token',$request->session_token)->get();
        if(count($ses) > 0){
            $ses = $ses->first();
            $data = [
                'ended'=>1
            ];
            $agent = User::where('id',$ses->user_id)->get()->first();
            $agent->update(['work_status_id'=>2]);
            $ses->update($data);
            $response = ['msg' => 'Session Ended', 'status' => 1];
            return response($response, RESPONSE_SUCCESS);
        }
        $response = ['msg' => 'Session not found.', 'rec' =>$ses, 'status' => 2];
        return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
    }

}
