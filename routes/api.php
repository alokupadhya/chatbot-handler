<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('login', 'API\Handler\User\AuthController@login')->name('login.api');
Route::post('forgot-password', 'API\Handler\User\AuthController@forgotPassword')->name('forgot-password.api');

// private routes
Route::middleware('auth:api')->namespace('API\Handler\User')->group(function () {
    Route::get('logout', 'AuthController@logout')->name('logout');
    Route::get('/user-details', function () {
        return Auth::user()->only(['id', 'first_name', 'last_name', 'email', 'work_status_id']);
    });
    Route::post('/update-password', 'AuthController@updatePassword')->name('update-password');
});

Route::namespace('API\Chatbox')->group(function () {
    Route::prefix('vu')->group(function () {
        Route::post('store', 'VisitedUsersController@store')->name('add_new_visited_user');
    });
    Route::prefix('chat')->group(function () {
        Route::get('/get-root-node', 'ChatbotController@getRootNode')->name('get_root_node');
        Route::post('/get-node', 'ChatbotController@getNode')->name('get_node');
        
    });
    Route::prefix('requested-question')->group(function () {
        Route::post('/create', 'RequestQuestionController@store')->name('create_rq');
        Route::get('/show', 'RequestQuestionController@show')->name('show_rq');
        Route::get('/show-recent', 'RequestQuestionController@showRecent')->name('show_recent_rq');
        Route::post('/delete', 'RequestQuestionController@destroy')->name('delete_rq');
    });
});

// Admin APIs
Route::middleware(['auth:api','isAdmin'])->group(function () {
    Route::post('/is-admin', function () {
        return true;
    });
});

Route::middleware(['auth:api','isAdmin'])->namespace('API\Handler\User')->group(function () {
    Route::prefix('admin')->group(function () {
        Route::post('/create-agent','AgentController@store')->name('create_new_agent');
        Route::post('/update-agent','AgentController@update')->name('update_agent');
        Route::post('/update-status','AgentController@updateStatus')->name('update_agent_status');
        Route::get('/get-agents','AgentController@show')->name('get_agents_list');
    });
});

Route::middleware(['auth:api','isAdmin'])->namespace('API\Handler\Bot')->group(function () {
    Route::prefix('admin/bot')->group(function () {
        Route::get('/get-root-node','ManageBotController@getRootNode')->name('get_root_node');
        Route::post('/get-node','ManageBotController@getNode')->name('get_node');
        Route::post('/get-options','ManageBotController@getOption')->name('get_options');
        Route::post('/add-option','ManageBotController@addOptionInNode')->name('add_option');
        Route::post('/update-node-question','ManageBotController@updateQuestion')->name('update_node_question');
        Route::post('/update-node-option','ManageBotController@updateOption')->name('update_node_option');
        Route::post('/delete-node','ManageBotController@deleteOption')->name('delete_node_option');

    });
});
// Admin APIs End

// Agent APIs
Route::middleware(['auth:api','isAgent'])->group(function () {
    Route::post('/is-agent', function () {
        return true;
    });
});

Route::middleware(['auth:api','isAgent'])->namespace('API\Handler\User')->group(function () {
    Route::prefix('agent')->group(function () {
        Route::post('/update-work-status','AgentController@updateWorkStatus')->name('update_work_status');
    });
});
// Agent APIs End