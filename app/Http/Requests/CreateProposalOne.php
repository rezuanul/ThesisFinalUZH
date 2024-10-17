<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateProposalOne extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $array = [
            'title' => ['required', 'max:100'],
            'expiry' => ['required'],
            'companies' => ['required'],
        ];
        
        return $array;
    }

    public function messages()
    {
        return [
            'companies.required' => 'Please select at least one company',
        ];
    }
}
