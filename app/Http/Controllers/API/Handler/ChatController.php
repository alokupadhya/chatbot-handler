<?php

namespace App\Http\Controllers\API\Handler;
use App\ChatboxUsers;
use App\AgentChatSession;
use App\RequestQuestion;
use App\ChatRecords;
use App\User;
use Hash;
use Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ChatController extends Controller
{
    /**
     * show chat data
     *
     * @return \Illuminate\Http\Response
     */
    public function showChatCounts()
    {
        try {
            $todaychats = count(AgentChatSession::whereDate('created_at', Carbon::today())->get());
            $allchats = count(AgentChatSession::all());
            $todayRQ = count(RequestQuestion::whereDate('created_at', Carbon::today())->get());
            $allRQ = count(RequestQuestion::all());
            $livechats = count(AgentChatSession::where('ended',0)->get());
            $ended = count(AgentChatSession::where('ended',1)->get());
            $online = count(User::where('role_id',2)->where('work_status_id',2)->get());
            $offline = count(User::where('role_id',2)->where('work_status_id',1)->get());
            $busy = count(User::where('role_id',2)->where('work_status_id',3)->get());

            $response = ['msg' => 'Data fetched', 'records' => [$todaychats,$allchats,$todayRQ,$allRQ,$livechats,$ended,$online,$offline,$busy], 'status' => 1];
            return response($response, RESPONSE_SUCCESS);
        } catch (\Exception $th) {

            return response($th->getMessage(), RESPONSE_UNAUTHORIZED);
        }
    }

    public function showAgentChatCount()
    {
        try {
            $agent = Auth::user();
            $allchats = count($agent->chatSession);           
            $response = ['msg' => 'Data fetched', 'records' => [$allchats], 'status' => 1];
            return response($response, RESPONSE_SUCCESS);
        } catch (\Exception $th) {

            return response($th->getMessage(), RESPONSE_UNAUTHORIZED);
        }
    }

}
