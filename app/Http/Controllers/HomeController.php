<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Services\Moralis\TokenService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public $tokenService;

    public function __construct()
    {
        $this->tokenService = new TokenService();
    }

    public function index()
    {
        return Inertia::render('Home', [
        ]);
    }

    public function settings(Request $request)
    {
        if (!empty($request->key)) {
            $settings = getSettings($request->key);
            return response()->json(['data' => $settings], 200);
        }

        return response()->json(['message' => 'Please provide valid key.'], 500);
    }
}
