<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('manage products');
    }

    public function rules(): array
    {
        $rules = [
            'title' => [
                'required',
                'string',
                'max:100',
                Rule::unique('product_categories')->ignore($this->route('product_category')),
            ],
            'is_active' => 'boolean',
        ];

        return $rules;
    }
}
