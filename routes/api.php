<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\BrandsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HsnCodeController;
use App\Http\Controllers\IndustryCategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

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
Route::post('register', [UserController::class, 'store']);

Route::get('/email/verify', function () {
    return response()->json(['message' => 'Please verify your email address.'], 403);
})->middleware('auth:sanctum')->name('verification.notice');
Route::get('/email/verify/{user}/{hash}', [UserController::class, 'verify'])->middleware(['signed'])->name('verification.verify');

Route::group(['middleware' => 'auth:sanctum'], function () {
    Route::post('logout', [LoginController::class, 'doLogout']);

    Route::apiResources([
        'category' => CategoryController::class,
        'application' => ApplicationController::class,
        'industry' => IndustryCategoryController::class,
        'brand' => BrandsController::class,
        'hsn-code' => HsnCodeController::class,
        'product' => ProductController::class,
    ]);
});

Route::get('/', [HomeController::class, 'index']);
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/product', [ProductController::class, 'index']);
Route::get('/application', [ApplicationController::class, 'index']);
Route::get('/industry', [IndustryCategoryController::class, 'index']);
Route::get('/brand', [BrandsController::class, 'index']);
Route::post('/cart', [ProductController::class, 'cart']);
