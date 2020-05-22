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
// private routes
Route::middleware('auth:api')->namespace('API\Handler\User')->group(function () {
    Route::get('logout', 'AuthController@logout')->name('logout');
});

Route::namespace('API\Chatbox')->group(function () {
    Route::prefix('vu')->group(function () {
        Route::post('store', 'VisitedUsersController@store')->name('add_new_visited_user');
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