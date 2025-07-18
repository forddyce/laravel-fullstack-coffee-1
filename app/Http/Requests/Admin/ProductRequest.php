<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('manage products');
    }

    public function rules(): array
    {
        $rules = [
            'title' => ['required', 'string', 'max:100'],
            'primary_image' => ['nullable', 'string'],
            'content' => ['nullable', 'string'],
            'summary' => ['nullable', 'string'],
            'specifications' => ['nullable', 'array'],
            'images' => ['nullable', 'array'],
            'is_active' => ['boolean'],
            'favorite' => ['integer', 'min:0'],
            'price' => ['numeric', 'min:0'],
            'category_ids' => ['nullable', 'array'],
            'category_ids.*' => ['exists:product_categories,id'],
        ];

        return $rules;
    }
}
