<?php

namespace App\Http\Controllers;

use App\Models\DealerEnquiry;
use Illuminate\Http\Request;

class DealerEnquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = DealerEnquiry::query();

        $enquires = $query->latest()->paginate($request?->limit ?: 10);

        return response()->json($enquires);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|min:2',
            'email' => 'required|email',
            'phone' => 'required',
            'company_name' => 'required'
        ]);

        $dealerEnquiry = new DealerEnquiry();
        $dealerEnquiry->name = $request->name;
        $dealerEnquiry->email = $request->email;
        $dealerEnquiry->phone = $request->phone;
        $dealerEnquiry->company_name = $request->company_name;
        $dealerEnquiry->message = $request->message;
        $dealerEnquiry->save();

        return response()->json([
            'message' => 'Enquiry has been sent, we will contact you shortly.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(DealerEnquiry $dealerEnquiry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, DealerEnquiry $dealerEnquiry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DealerEnquiry $dealerEnquiry)
    {
        $dealerEnquiry->delete();

        return response([
            'message' => 'Record has been deleted.'
        ]);
    }
}
