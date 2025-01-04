<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PictureController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\API\AuthController;
use App\Models\Picture;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\PictureResource;



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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//------------------------------------


Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);

Route::group(['middleware'=>['auth:sanctum']],function(){
    Route::get('/profile',function(Request $request){
        return auth()->user();
    });
    Route::resource('pictures',PictureController::class)->only(['update','store','destroy']);
    Route::post('/logout',[AuthController::class,'logout']);
});





//PICTURES
Route::resource('pictures',PictureController::class)->only(['index']);
Route::get('pictures/search/{title}', [PictureController::class, 'searchByTitle']);
Route::get('categories/{category}/pictures', [PictureController::class, 'searchByCategory']);
Route::get('pictures/under/{price}', [PictureController::class, 'searchByPrice']);
Route::get('pictures/{id}/low-res', [PictureController::class, 'showLowRes']);
Route::get('pictures/{id}/high-res', [PictureController::class, 'showHighRes'])->middleware('auth:sanctum');


//USERS
Route::get('/users', [UserController::class, 'index']);
Route::get('/users/{id}', [UserController::class, 'show']);
//->middleware('auth:sanctum');


//CATEGORY
// Route::resource('categories', CategoryController::class)->except(['create', 'edit']);
//Route::get('categories/{category}/pictures', [CategoryController::class, 'pictures']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);
Route::post('/categories', [CategoryController::class, 'store'])->middleware('auth:sanctum');
Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->middleware('auth:sanctum');


//PAGINACIJA
Route::get('/paginate', [PictureController::class, 'paginate_pictures']);



//CART
// Route::middleware('auth:sanctum')->group(function () {
//     Route::post('/purchase', [PurchaseController::class, 'store']);
//     Route::get('/purchases', [PurchaseController::class, 'index']);
// });
//Route::post('/purchase', [PurchaseController::class, 'purchase'])->middleware('auth:sanctum');


Route::get('/cart', [CartController::class, 'index']);
Route::post('/cart', [CartController::class, 'add']);
Route::delete('/cart/{id}', [CartController::class, 'remove']);
Route::post('/cart/checkout', [CartController::class, 'checkout']);




