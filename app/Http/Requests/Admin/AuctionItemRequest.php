<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AuctionItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'title' => [
                'required',
                'string',
                'max:100',
                Rule::unique('auction_items')->ignore($this->route('auction_item')),
            ],
            'content' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'info.type' => ['nullable', 'string', 'max:50'],
            'info.score' => ['nullable', 'string', 'max:50'],
            'info.farmer' => ['nullable', 'string', 'max:100'],
            'info.origin' => ['nullable', 'string', 'max:255'],
            'info.process' => ['nullable', 'string', 'max:100'],
            'info.auction_price' => ['nullable', 'numeric', 'min:0'],
        ];

        return $rules;
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'is_active' => $this->boolean('is_active'),
            'info' => [
                'type' => $this->input('info.type'),
                'score' => $this->input('info.score'),
                'farmer' => $this->input('info.farmer'),
                'origin' => $this->input('info.origin'),
                'process' => $this->input('info.process'),
                'auction_price' => $this->input('info.auction_price'),
            ],
        ]);
    }
}
