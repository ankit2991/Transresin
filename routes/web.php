<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('reset', function () {
    Artisan::call('route:clear');
    Artisan::call('cache:clear');
    Artisan::call('config:clear');
    Artisan::call('config:cache');
});

Route::get('/clear', function () {
    return Artisan::call('optimize:clear');
});
Route::get('/view-clear', function () {
    return Artisan::call('view:clear');
});

Route::get('/storage', function () {
    return Artisan::call('storage:link');
});

Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '.*');
