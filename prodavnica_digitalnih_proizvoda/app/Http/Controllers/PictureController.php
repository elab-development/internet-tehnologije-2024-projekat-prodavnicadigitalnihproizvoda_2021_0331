<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Picture;
use App\Http\Resources\PictureResource;
use App\Http\Resources\PictureCollection;
use Illuminate\Support\Facades\Validator;


class PictureController extends Controller
{
    public function index(){
       
        return response()->json(Picture::all(), 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'category_id' => 'required',
            'low_res_path' => 'required|string',
            'high_res_path' => 'required|string',
            'price' => 'required|numeric',
        ]);

        if($validator->fails())
            return response()->json($validator->errors());

        $picture = Picture::create([
            'title' => $request->title,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'low_res_path' => $request->low_res_path,
            'high_res_path' => $request->high_res_path,
            'price' => $request->price,
        ]);
        return response()->json(['Picture is created successfully', new PictureResource($picture)]);
    }

    public function show($id){
        
        $picture = Picture::find($id);
        if (!$picture) {
            return response()->json(['error' => 'Picture not found'], 404);
        }

        return response()->json($picture, 200);
    }

    public function update(Request $request, Picture $picture)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required|string|max:255',
            'description' => 'required|string|max:255',
            'category_id' => 'required',
            'low_res_path' => 'required|string',
            'high_res_path' => 'required|string',
            'price' => 'required|numeric',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors());

        }

        $picture->title = $request->title;
        $picture->description = $request->description;
        $picture->category_id = $request->category_id;
        $picture->low_res_path = $request->low_res_path;
        $picture->high_res_path = $request->high_res_path;
        $picture->price = $request->price;

        $picture->save();
        return response()->json(['Picture is updated successfully', new PictureResource($picture)]);
    }

    public function destroy(Picture $picture)
    {
        
        $picture->delete();
        return response()->json('Picture is deleted successfully');    
    }

    public function searchByTitle($title)
{
    $pictures = Picture::where('title', 'like', '%' . $title . '%')->get();
 
    if ($pictures->isEmpty()) {
        return response()->json(['error' => 'No picture found'], 404);
    }
 
    return response()->json($pictures, 200);
}


public function searchByCategory($category)
{
    $pictures = Picture::where('category_id', $category)->get();
 
    if ($pictures->isEmpty()) {
        return response()->json(['error' => 'No pictures found in this category'], 404);
    }
 
    return response()->json($pictures, 200);
}

public function searchByPrice($price)
{
    $pictures = Picture::where('price', '<=', $price)->get();
 
    if ($pictures->isEmpty()) {
        return response()->json(['error' => 'No pictures found under this price'], 404);
    }
 
    return response()->json($pictures, 200);
}

public function showLowRes($id)
    {
        $picture = Picture::find($id);

        if (!$picture) {
            return response()->json(['message' => 'Picture not found'], 404);
        }

        return response()->json(['low_res_path' => $picture->low_res_path], 200);
    }

public function showHighRes($id)
    {
        $picture = Picture::find($id);

        if (!$picture) {
            return response()->json(['message' => 'Picture not found'], 404);
        }

        return response()->json(['high_res_path' => $picture->high_res_path], 200);
    }



    public function paginate_pictures(Request $request)
{
    
    $perPage = $request->input('per_page', 4);


    $pictures = Picture::paginate($perPage);

    if ($pictures->isEmpty()) {
        return response()->json(['error' => 'No pictures found'], 404);
    }

    return response()->json([
        'current_page' => $pictures->currentPage(),
        'data' => $pictures->items(),
        'per_page' => $pictures->perPage(),
        'total' => $pictures->total(),
        'last_page' => $pictures->lastPage()
    ], 200);
}

}