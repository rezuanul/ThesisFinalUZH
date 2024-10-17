<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImagesController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VoteController;
use Illuminate\Http\Request;
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

// Dashboard
Route::get('/', [HomeController::class, 'index'])
->name('home');

Route::get('/fetch/{eth_address}', [UserController::class, 'show'])
->name('fetch');

Route::post('/register', [UserController::class, 'store'])
->name('register');

Route::post('/settings', [HomeController::class, 'settings'])
->name('settings');

Route::post('/create-proposal', [ProposalController::class, 'store'])
->name('createProposal')->middleware('auth');

Route::post('/vote', [VoteController::class, 'store'])
->name('vote')->middleware('auth');

Route::post('/search', [UserController::class, 'index'])
->name('search')->middleware('auth');

Route::post('/set-doctor', [UserController::class, 'setDoctor'])
->name('setDoctor')->middleware('auth');

Route::post('/vaccinated', [UserController::class, 'vaccinated'])
->name('vaccinated')->middleware('auth');

// 500 error
Route::get('500', function () {
    // Force debug mode for this endpoint in the demo environment
    if (App::environment('demo')) {
        Config::set('app.debug', true);
    }

    echo $fail;
});

// Images
Route::get('/img/{path}', [ImagesController::class, 'show'])->where('path', '.*');