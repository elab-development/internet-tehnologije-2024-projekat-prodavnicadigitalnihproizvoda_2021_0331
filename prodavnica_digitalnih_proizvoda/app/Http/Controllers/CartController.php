<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Picture;
use Illuminate\Support\Facades\Response;


class CartController extends Controller
{
    public function index()
    {
        $cart = Cart::where('user_id', auth()->id())->with('picture')->get();
        

        if ($cart->isEmpty()) {
            return response()->json(['message' => 'Cart is empty'], 200);
        }

        return response()->json($cart, 200);
    }

    public function add(Request $request)
    {
        $validated = $request->validate([
            'picture_id' => 'required|exists:pictures,id', 
            
        ]);

        $picture = Picture::find($validated['picture_id']);   

        if (!$picture) {   
             return response()->json(['error' => 'Picture not found'], 404); 
        }

        $cart = Cart::create([
            'user_id' => auth()->id(),
            'picture_id' => $validated['picture_id'],
            'price_to_pay'=>$picture->price,

        ]);

        $picture->increment('downloads');

        return response()->json(['message' => 'Item bought', 'cart' => $cart], 201);
    }

    public function remove($id)
    {
        $cart = Cart::find($id);

        if (!$cart || $cart->user_id !== auth()->id()) {
            
            return response()->json(['message' => 'Item not found in cart'], 404);
        }

        $cart->delete();
        return response()->json(['message' => 'Item removed from cart'], 200);
    }

    public function checkout()
{
    $cart = Cart::where('user_id', auth()->id())->get();
 
    if ($cart->isEmpty()) {
        return response()->json(['message' => 'Cart is empty'], 200);
    }
 
    $totalPrice = $cart->sum('price_to_pay');
 
    $paymentSuccessful = true;
 
    if ($paymentSuccessful) {
        Cart::where('user_id', auth()->id())->delete();
 
        return response()->json([
            'message' => 'Checkout complete. Thank you for your purchase!',
            'total_price' => $totalPrice,
        ], 200);
    } else {
        return response()->json([
            'error' => 'Payment failed. Please try again later.'
        ], 500);
    }
}

public function downloadHighRes($cartId)
{
    $cart = Cart::with('picture')
        ->where('id', $cartId)
        ->where('user_id', auth()->id())
        ->first();

    if (!$cart || !$cart->picture) {
        return response()->json(['error' => 'Unauthorized or picture not found'], 403);
    }

    $path = public_path($cart->picture->high_res_path);

    if (!file_exists($path)) {
        return response()->json(['error' => 'File not found'], 404);
    }

    return Response::make(file_get_contents($path), 200, [
        'Content-Type' => 'application/octet-stream',
        'Content-Disposition' => 'attachment; filename="' . basename($path) . '"',
        'Access-Control-Allow-Origin' => '*',
        'Access-Control-Allow-Methods' => 'GET, OPTIONS',
        'Access-Control-Allow-Headers' => 'Origin, Content-Type, Authorization',
    ]);
}

}
