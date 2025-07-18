<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'primary_image' => $this->primary_image,
            'content' => $this->content,
            'summary' => $this->summary,
            'specifications' => is_array($this->specifications) ? $this->specifications : json_decode($this->specifications ?? '[]', true),
            'images' => is_array($this->images) ? $this->images : json_decode($this->images ?? '[]', true),
            'is_active' => $this->is_active,
            'favorite' => $this->favorite,
            'price' => $this->price,
            'created_by' => $this->created_by,
            'updated_by' => $this->updated_by,
            'created_at' => $this->created_at ? $this->created_at->format('Y-m-d H:i:s') : null,
            'updated_at' => $this->updated_at ? $this->updated_at->format('Y-m-d H:i:s') : null,
            'categories' => ProductCategoryResource::collection($this->whenLoaded('categories')),
        ];
    }
}
