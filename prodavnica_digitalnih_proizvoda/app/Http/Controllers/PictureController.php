<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Picture;
use App\Http\Resources\PictureResource;
use App\Http\Resources\PictureCollection;

class PictureController extends Controller
{
    public function index(){
        $pictures = Picture::all();
        //return PictureResource::collection($pictures);
        return new PictureCollection($pictures);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'low_res_path' => 'required|string',
            'high_res_path' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $picture = Picture::create($validated);
        return response()->json($picture, 201);
    }

    public function show($id){
        //$pictures = Picture::find($id);

        //return new PictureResource($picture);
        $picture = Picture::find($id);
        if (!$picture) {
            return response()->json(['error' => 'Picture not found'], 404);
        }

        return response()->json($picture, 200);
    }

    public function update(Request $request, $id)
    {
        $picture = Picture::find($id);
        if (!$picture) {
            return response()->json(['error' => 'Picture not found'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'low_res_path' => 'required|string',
            'high_res_path' => 'required|string',
            'price' => 'required|numeric',
        ]);

        $picture->update($validated);
        return response()->json($picture, 200);
    }

    public function destroy($id)
    {
        $picture = Picture::find($id);
        if (!$picture) {
            return response()->json(['error' => 'Picture not found'], 404);
        }

        $picture->delete();
        return response()->json(['message' => 'Picture deleted successfully'], 200);
    }

}
