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
       
        $pictures = Picture::with('category')->get()->map(function ($picture) {
            return [
                'id' => $picture->id,
                'title' => $picture->title,
                'description' => $picture->description,
                'category_id' => $picture->category_id,
                'category_name' => $picture->category ? $picture->category->name : "Unknown",
                'price' => $picture->price,
                'low_res_path' => asset($picture->low_res_path),
                'high_res_path' => asset($picture->high_res_path),
            ];
        });
    
        return response()->json(['pictures' => $pictures], 200);
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
    
    $highResPath = public_path($picture->high_res_path);
    $lowResPath = public_path($picture->low_res_path);

    
    if (file_exists($highResPath)) {
        unlink($highResPath);
    }

    if (file_exists($lowResPath)) {
        unlink($lowResPath);
    }

    
    $picture->delete();

    return response()->json('Picture and files deleted successfully');
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

public function upload(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'category_id' => 'required|exists:categories,id',
            'high_res_file' => 'required|file|mimes:jpeg,png,jpg|max:5120', 
            'low_res_file' => 'required|file|mimes:jpeg,png,jpg|max:2048', 
            'price' => 'required|numeric|min:0',
        ]);
 
        $highResPath = $request->file('high_res_file')->move(public_path('images/high_res'), $request->file('high_res_file')->getClientOriginalName());
        $lowResPath = $request->file('low_res_file')->move(public_path('images/low_res'), $request->file('low_res_file')->getClientOriginalName());

        $picture = Picture::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category_id' => $validated['category_id'],
            'high_res_path' => 'images/high_res/' . $request->file('high_res_file')->getClientOriginalName(),
            'low_res_path' => 'images/low_res/' . $request->file('low_res_file')->getClientOriginalName(),
            'price' => $validated['price'],
        ]);
 
        return response()->json(['message' => 'Picture uploaded successfully', 'picture' => $picture], 201);
    }




}