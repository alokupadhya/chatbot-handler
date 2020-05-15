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

Route::post('login', 'API\Handler\Auth\LoginController@login')->name('login.api');

Route::namespace('API\Chatbox')->group(function () {
    Route::prefix('vu')->group(function () {
        Route::post('store', 'VisitedUsersController@store')->name('add_new_visited_user');
    });
});