<?php

namespace App\Http\Controllers\API\Handler\Bot;

use App\BotQuestion;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ManageBotController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function getRootNode()
    {
        try {
            $rootNode = BotQuestion::where('type',0)->first();
            $response = ['msg' => RESPONSE_ALL_ROWS ,'records'=>$rootNode, 'status'=> 1];
		    return response($response, RESPONSE_SUCCESS);

        } catch (\Throwable $th) {
            return response($th->getMessage(), RESPONSE_UNAUTHORIZED);
        }
    }

}
