<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BlogTagRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('manage blog tags');
    }

    public function rules(): array
    {
        $rules = [
            'title' => [
                'required',
                'string',
                'max:100',
                Rule::unique('blog_tags')->ignore($this->route('blog_tag')),
            ],
            'is_active' => 'boolean',
        ];

        return $rules;
    }
}
