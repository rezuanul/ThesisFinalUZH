<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class Vaccinated extends FormRequest
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
            'patient_wallet_address' => ['required'],
            'vaccine_company_name' => ['required'],
        ];
        
        return $array;
    }

    public function messages()
    {
        return [
        ];
    }
}
