<?php

namespace App\Http\Controllers\API\Handler\Bot;

use App\BotQuestion;
use App\BotOption;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\DB;

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
            $rootNode = BotQuestion::where('type',0)->where('bot_option_id',null)->first();
            $response = ['msg' => RESPONSE_ALL_ROWS ,'records'=>$rootNode, 'status'=> 1];
		    return response($response, RESPONSE_SUCCESS);

        } catch (\Throwable $th) {
            return response($th->getMessage(), RESPONSE_UNAUTHORIZED);
        }
    }

    public function getNode(Request $request)
    {
        try {
            $rootNode = BotQuestion::where('bot_option_id',$request->id)->first();
            $response = ['msg' => RESPONSE_ALL_ROWS ,'records'=>$rootNode, 'status'=> 1];
		    return response($response, RESPONSE_SUCCESS);

        } catch (\Throwable $th) {
            return response($th->getMessage(), RESPONSE_UNAUTHORIZED);
        }
    }

    public function getOption(Request $request)
    {
        try {
            $nodeOptions = BotOption::where('bot_question_id',$request->id)->get();
            $response = ['msg' => RESPONSE_ALL_ROWS ,'records'=>$nodeOptions, 'status'=> 1];
		    return response($response, RESPONSE_SUCCESS);

        } catch (\Throwable $th) {
            return response($th->getMessage(), RESPONSE_UNAUTHORIZED);
        }
    }

    public function addOptionInNode(Request $request)
    {
        DB::beginTransaction();
        try
    	{
            $question = BotQuestion::findorFail($request->id);
            if($question->type==1){
                $response = ['msg' => 'You can\'t add option in final node, Make it Question.', 'status' => 2];
                return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
            }
            $count = count(BotOption::where('bot_question_id',$request->id)->get());
            if($count > 3){
                $response = ['msg' => 'You can\'t add option more than 4', 'status' => 2];
                return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
            }

            $validation = ['option' => 'required|max:20|min:4',];
            $validator = Validator::make($request->all(), $validation);
            if ($validator->fails()) 
            { 
                $response = ['msg' => $validator->errors(), 'status' => 1];
                return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);            
            }
            else
            {
                
                $data = [
                    'bot_question_id' => $request->id,
                    'option'=>$request->option,
                ];
                $option = BotOption::create($data);
                
                $nextNode = [
                    'bot_option_id' => $option->id,
                    'qa' => 'This is final answer for last selected node, you can update or change it to question by clicking on the edit option. ',
                    'type' => 1,
                ];
                $nextNodeQ = BotQuestion::Create($nextNode);
                DB::commit();
                $response = ['msg' => 'Data '.RESPONSE_EDIT_ROWS, 'option'=>$option, 'node'=>$nextNodeQ, 'status' => 1];
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
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function updateQuestion(Request $request)
    {
        DB::beginTransaction();
        try
    	{
            $question = BotQuestion::findorFail($request->id);
            $data = ['qa' => $request->qa];
            $validation = ['qa' => 'required|max:255|min:5',];
            if($question->bot_option_id != null){
                if($request->type==1){
                    if(count(BotOption::where('bot_question_id',$request->id)->get()) > 0){
                        $response = ['msg' => 'You can not make question to final, please first remove all options.', 'status' => 2];
                        return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);
                    }
                }
                $data['type'] = $request->type;
            }
            $validator = Validator::make($request->all(), $validation);
            if ($validator->fails()) 
            { 
                $response = ['msg' => $validator->errors(), 'status' => 1];
                return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);            
            }
            else
            {
                $question->update($data);
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
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function updateOption(Request $request)
    {
        DB::beginTransaction();
        try
    	{
            $option = BotOption::findorFail($request->id);
            
            $data = ['option' => $request->option];
            $validation = ['option' => 'required|max:20|min:4',];
            
            $validator = Validator::make($request->all(), $validation);
            if ($validator->fails()) 
            { 
                $response = ['msg' => $validator->errors(), 'status' => 1];
                return response()->json($response, RESPONSE_UNPROCESSABLE_ENTITY);            
            }
            else
            {
                $option->update($data);
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

    public function deleteOption(Request $request)
    {
        DB::beginTransaction();
        try
    	{
            $option = BotOption::findorFail($request->id);
            $option->delete();
            DB::commit();
            $response = ['msg' => 'Data Deleted', 'status' => 1];
            return response($response, RESPONSE_SUCCESS);
        }
        catch (\Exception $e) 
		{
            DB::rollback();
			return response($e->getMessage(), RESPONSE_UNAUTHORIZED);
		}
    }

}
