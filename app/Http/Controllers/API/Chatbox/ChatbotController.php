<?php

namespace App\Http\Controllers\API\Chatbox;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\BotQuestion;
use App\BotOption;

class ChatbotController extends Controller
{
    public function getRootNode()
    {
        try {
            $node = BotQuestion::where('type',0)->where('bot_option_id',null)->first();
            $nodeOptions = BotOption::where('bot_question_id',$node->id)->get();
            $response = ['msg' => RESPONSE_ALL_ROWS ,'records'=>[$node,$nodeOptions], 'status'=> 1];
		    return response($response, RESPONSE_SUCCESS);

        } catch (\Throwable $th) {
            return response($th->getMessage(), RESPONSE_UNAUTHORIZED);
        }
    }

    public function getNode(Request $request)
    {
        try {
            $node = BotQuestion::where('bot_option_id',$request->id)->first();
            $nodeOptions = BotOption::where('bot_question_id',$node->id)->get();
            $response = ['msg' => RESPONSE_ALL_ROWS ,'records'=>[$node,$nodeOptions], 'status'=> 1];
		    return response($response, RESPONSE_SUCCESS);

        } catch (\Throwable $th) {
            return response($th->getMessage(), RESPONSE_UNAUTHORIZED);
        }
    }
}
