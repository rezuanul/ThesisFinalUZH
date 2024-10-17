<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Register extends FormRequest
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
            'first_name' => ['required', 'max:100'],
            'last_name' => ['required', 'max:100'],
            'role' => ['required'],
            'address' => ['required'],
            'city' => ['required'],
            'country' => ['required'],
            'postal_code' => ['required'],
            'licence_number' => ['required_if:role,doctor'],
            'wallet_address' => ['required'],
        ];
        
        return $array;
    }

    public function messages()
    {
        return [
        ];
    }
}
