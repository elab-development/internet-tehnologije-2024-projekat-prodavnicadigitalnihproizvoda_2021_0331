<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Picture;
use Illuminate\Http\Request;

class PictureResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
public static $wrap = 'picture';

    public function toArray($request)
    {
        //return parent::toArray($request);
        return[
            'id'=>$this->id,
            'title'=>$this->title,
            'description'=>$this->description,
            'low_res_path'=>$this->low_res_path,
            'high_res_path'=>$this->high_res_path,
            'price'=>$this->price,
            'category'=>$this->category
        ];
    }
}
