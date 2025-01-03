<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PictureController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;
use App\Models\Picture;

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

Route::get('pictures/{id}',[PictureController::class,'show']);
Route::get('pictures',[PictureController::class,'index']);
Route::get('/users',[UserController::class,'index']);
// Route::get('/users/{id}',[UserController::class,'show']);

Route::resource('pictures', PictureController::class);

//Route::get('pictures/{id}/category',[CategoryController::class,'index'])->name('pictures.category.index');




//------------------------------------
Route::get('categories/{category}/pictures', [PictureController::class, 'searchByCategory']);

Route::get('pictures/search/{title}', [PictureController::class, 'searchByTitle']);

Route::get('pictures/under/{price}', [PictureController::class, 'searchByPrice']);

