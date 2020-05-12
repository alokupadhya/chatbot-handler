<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('main/home');
// });

Route::domain('schoolchatbot.local')->group(function () {
    Route::get('/', function () {
        return view('web/home');
    });
});


Route::domain('handler.schoolchatbot.local')->group(function () {
    Route::get('{all?}', function () {
        return view('handler/home');
    })->where('all', '([A-z\d-\/_.]+)?');
});