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

Route::get('/random-quote', function () {
    try {
        Log::info('Fetching quote from ZenQuotes API...');

        $response = Http::get('https://zenquotes.io/api/random');

        if ($response->failed()) {
            Log::error('ZenQuotes API failed', ['status' => $response->status(), 'body' => $response->body()]);
            return response()->json(['error' => 'Failed to fetch quote'], 500);
        }

        $quoteData = $response->json()[0] ?? null;

        if (!$quoteData || !isset($quoteData['q']) || !isset($quoteData['a'])) {
            Log::error('Invalid response from ZenQuotes API', ['response' => $response->json()]);
            return response()->json(['error' => 'Invalid response'], 500);
        }

        Log::info('Quote fetched successfully', ['quote' => $quoteData['q'], 'author' => $quoteData['a']]);

        return response()->json([
            'quote' => $quoteData['q'],
            'author' => $quoteData['a']
        ]);
    } catch (\Exception $e) {
        Log::error('Exception occurred: ' . $e->getMessage());
        return response()->json(['error' => 'Internal Server Error'], 500);
    }
});

 Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
 });

//------------------------------------

// Rute za autentifikaciju
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
 
// ------------------------------------
// Rute za sve korisnike (neulogovani korisnici)
Route::group([], function () {
    Route::get('pictures', [PictureController::class, 'index']);
    Route::get('pictures/search/{title}', [PictureController::class, 'searchByTitle']); 
    Route::get('categories/{category}/pictures', [PictureController::class, 'searchByCategory']); 
    Route::get('pictures/under/{price}', [PictureController::class, 'searchByPrice']); 
    Route::get('pictures/{id}/low-res', [PictureController::class, 'showLowRes']); 
    Route::get('/categories', [CategoryController::class, 'index']); 
    Route::get('/categories/{id}', [CategoryController::class, 'show']); 

});
 
// ------------------------------------
// Rute za ulogovane korisnike
Route::group(['middleware' => ['auth:sanctum','role:user']], function () {
    Route::post('/logout', [AuthController::class, 'logout']); 
 
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });
 
    Route::get('/cart', [CartController::class, 'index']); 
    Route::post('/cart', [CartController::class, 'add']); 
    Route::delete('/cart/{id}', [CartController::class, 'remove']); 
    Route::post('/cart/checkout', [CartController::class, 'checkout']); 
    Route::get('/cart/{id}/download', [CartController::class, 'downloadHighRes']); 
});
 
// ------------------------------------
// Rute za administratore
Route::group(['middleware' => ['auth:sanctum', 'role:admin']], function () {
    Route::resource('pictures', PictureController::class)->only(['store', 'update', 'destroy']); 
    Route::post('/categories', [CategoryController::class, 'store']); 
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']); 
    Route::get('/users', [UserController::class, 'index']); 
    Route::get('/users/{id}', [UserController::class, 'show']); 
    Route::post('/pictures/upload', [PictureController::class, 'upload']);
});
 
// ------------------------------------
// Paginate ruta
Route::get('/paginate', [PictureController::class, 'paginate_pictures']);

