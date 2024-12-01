<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\BrandsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactEnquiryController;
use App\Http\Controllers\DealerEnquiryController;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\HsnCodeController;
use App\Http\Controllers\IndustryCategoryController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\TestimonialController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VideoController;

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

    Route::get('/order', [OrderController::class, 'index']);
    Route::post('/order', [OrderController::class, 'store']);

    Route::get('/dealer-enquiry', [DealerEnquiryController::class, 'index']);
    Route::get('/newsletter', [NewsletterController::class, 'index']);
    Route::post('/newsletter/email', [NewsletterController::class, 'sendEmails']);
    Route::get('/contact-enquiry', [ContactEnquiryController::class, 'index']);
    Route::delete('/dealer-enquiry/:dealerEnquiry', [DealerEnquiryController::class, 'destroy']);

    Route::apiResources([
        'category' => CategoryController::class,
        'application' => ApplicationController::class,
        'industry' => IndustryCategoryController::class,
        'brand' => BrandsController::class,
        'hsn-code' => HsnCodeController::class,
        'product' => ProductController::class,
        'material' => MaterialController::class,
        'feature' => FeatureController::class,
        'page' => PageController::class,
        'user' => UserController::class,
        'video' => VideoController::class,
        'testimonial' => TestimonialController::class,
        'slider' => SliderController::class,
    ]);


    Route::post('edit-profile', [UserController::class, 'editProfile']);
    Route::post('change-password', [UserController::class, 'changePassword']);
});

Route::get('/', [HomeController::class, 'index']);
Route::get('/home', [HomeController::class, 'front']);
Route::get('/category', [CategoryController::class, 'index']);
Route::get('/product', [ProductController::class, 'index']);
Route::get('/web/product/{product}', [ProductController::class, 'show']);
Route::get('/web/page/{page}', [PageController::class, 'show']);
Route::get('/web/slider', [SliderController::class, 'index']);
Route::get('/application', [ApplicationController::class, 'index']);
Route::get('/industry', [IndustryCategoryController::class, 'index']);
Route::get('/brand', [BrandsController::class, 'index']);
Route::post('/cart', [ProductController::class, 'cart']);
Route::get('/my-orders', [OrderController::class, 'index']);
Route::post('/web/order', [OrderController::class, 'store']);
Route::get('/order/{order}', [OrderController::class, 'show']);
Route::put('/order/{order}', [OrderController::class, 'update']);
Route::post('/dealer-enquiry', [DealerEnquiryController::class, 'store']);
Route::post('/contact-enquiry', [ContactEnquiryController::class, 'store']);
Route::post('/newsletter', [NewsletterController::class, 'store'])->name('newsletter.store');
