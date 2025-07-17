<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class BlogRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()->can('manage blog posts');
    }

    public function rules(): array
    {
        $rules = [
            'title' => [
                'required',
                'string',
                'max:100',
            ],
            'content' => ['nullable', 'string'],
            'summary' => ['nullable', 'string', 'max:500'],
            'featured_image' => ['nullable', 'url', 'max:255'],
            'is_active' => ['boolean'],
            'published_date' => ['nullable', 'date'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['exists:blog_tags,id'],
        ];

        if ($this->route('blog')) {
            $rules['title'][] = Rule::unique('blogs')->ignore($this->route('blog')->id);
        } else {
            $rules['title'][] = 'unique:blogs,title';
        }

        return $rules;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
            'published_date' => $this->input('published_date') ?? now(),
        ]);
    }
}
