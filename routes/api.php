<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\BrandsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\IndustryCategoryController;
use App\Http\Controllers\LoginController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [LoginController::class, 'doLogin']);

Route::get('/', [HomeController::class, 'index']);
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/application', [ApplicationController::class, 'index']);
Route::get('/industry', [IndustryCategoryController::class, 'index']);
Route::get('/brand', [BrandsController::class, 'index']);


Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('logout', [LoginController::class, 'doLogout']);

    Route::apiResources([
        'category' => CategoryController::class
    ]);
    Route::apiResources([
        'application' => ApplicationController::class
    ]);
    Route::apiResources([
        'industry' => IndustryCategoryController::class
    ]);
    Route::apiResources([
        'brand' => BrandsController::class
    ]);
});
