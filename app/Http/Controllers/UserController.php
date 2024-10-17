<?php

namespace App\Http\Controllers;

use App\Http\Requests\Register;
use App\Http\Requests\SetDoctor;
use App\Http\Requests\Vaccinated;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $auth = Auth::user();
        $key = $request->key;
        $role = 'doctor';
        if ($auth->role == 'doctor') {
            $role = 'patient';
        }


        $users = [];
        if (!empty($key)) {
            $users = User::where('role', $role)->filter(['search' => $key])->get();
        }

        return response()->json(['users' => $users], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Register $request)
    {
        $profile = profileExist($request->wallet_address);

        $arr = [
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'address' => $request->address,
            'city' => $request->city,
            'country' => $request->country,
            'postal_code' => $request->postal_code,
            'licence_number' => $request->licence_number,
            'wallet_address' => strtolower($request->wallet_address),
        ];

        $msg = 'You have registered successfully.';
        if (!$profile) {
            $arr['role'] = $request->role;
            $user = User::create($arr);
            Auth::login($user);
        } else {
            $msg = 'Your profile has been updated.';
            $profile->update($arr);
        }

        return Redirect::back()->with('success', $msg);
    }

    /**
     * Display the specified resource.
     *
     * @param  $ethAddress
     * @return \Illuminate\Http\Response
     */
    public function show($walletAddress)
    {
        try {
            $user = profileExist($walletAddress);

            $isAdmin = false;
            
            if (!empty($user)) {
                Auth::login($user);
                $isAdmin = $user->is_admin;
            } else {
                Auth::logout();
            }

            return response()->json(['profile' => $user, 'isAdmin' => $isAdmin], 200);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['msg' => 'Something went wrong, please try after some time.'. $e->getMessage()], 500);
        }
    }

    public function setDoctor(SetDoctor $request)
    {
        $auth = Auth::user();
        $walletAddress = $request->doctor_wallet_address;

        if ($auth->is_vaccinated) {
            return Redirect::back()->with('error', 'Patient already vaccinated');
        }

        $auth->assigned_doctor = $walletAddress;
        $auth->save();

        return Redirect::back()->with('success', 'Doctor assigned successfully to patient.');
    }

    public function vaccinated(Vaccinated $request)
    {
        $auth = Auth::user();
        $walletAddress = $request->patient_wallet_address;
        $name = $request->vaccine_company_name;

        $patient = User::where(['wallet_address' => $walletAddress, 'role' => 'patient'])->first();
        if (empty($patient)) {
            return Redirect::back()->with('error', 'Patient not found.');
        }

        if ($patient->is_vaccinated) {
            return Redirect::back()->with('error', 'Patient already vaccinated.');
        }

        if ($patient->assigned_doctor != $auth->wallet_address) {
            return Redirect::back()->with('error', 'Only authorised doctor can vaccinate the patient.');
        }

        $meta = $patient->meta;
        $meta['vaccine_company_name'] = $name;

        $patient->is_vaccinated = true;
        $patient->meta = $meta;
        $auth->save();

        return Redirect::back()->with('success', 'Patient vaccinated successfully.');
    }
}
