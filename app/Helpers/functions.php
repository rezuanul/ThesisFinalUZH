<?php

use App\Models\Setting;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

function beginTransaction()
{
    DB::beginTransaction();
}

function rollBack()
{
    DB::rollBack();
}

function commit()
{
    DB::commit();
}

function isApi()
{
    return request()->is('api/*');
}

function isAdmin()
{
    $auth = Auth::user();

    if (!empty($auth) && $auth->is_admin) {
        return true;
    }

    return false;
}

function getSettings($key)
{
    if (is_array($key)) {
        return Setting::whereIn('key', $key)->get();
    } else if ($key === 'all') {
        return Setting::get();
    } else {
        return Setting::where('key', $key)->first();
    }
}

function profileExist($walletAddress)
{
    $user = User::whereRaw('LOWER(wallet_address) = ?', strtolower($walletAddress))->first();

    if (empty($user)) {
        return false;
    }

    return $user;
}