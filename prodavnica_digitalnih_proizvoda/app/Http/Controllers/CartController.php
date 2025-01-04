<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\Picture;

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

        $cart = Cart::create([
            'user_id' => auth()->id(),
            'picture_id' => $validated['picture_id'],
        ]);

        return response()->json(['message' => 'Item added to cart', 'cart' => $cart], 201);
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

        // Process purchase logic here...

        Cart::where('user_id', auth()->id())->delete();
        return response()->json(['message' => 'Checkout complete'], 200);
    }

    

    public function downloadHighRes($id)
{
    $cart = Cart::where('user_id', auth()->id())
        ->where('picture_id', $id)
        ->first();

    if (!$cart) {
        return response()->json(['error' => 'Unauthorized'], 403);
    }

    $picture = Picture::find($id);
    if (!$picture) {
        return response()->json(['error' => 'Picture not found'], 404);
    }

    return response()->download(public_path($picture->high_res_path));
}
}
