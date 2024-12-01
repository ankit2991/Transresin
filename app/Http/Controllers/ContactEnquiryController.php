<?php

namespace App\Http\Controllers;

use App\Models\ContactEnquiry;
use Illuminate\Http\Request;

class ContactEnquiryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = ContactEnquiry::query();

        $enquires = $query->latest()->paginate($request?->limit ?: 10);

        return response()->json($enquires);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|min:2',
            'email' => 'required|email',
            'phone' => 'required',
        ]);

        $dealerEnquiry = new ContactEnquiry();
        $dealerEnquiry->first_name = $request->first_name;
        $dealerEnquiry->last_name = $request->last_name;
        $dealerEnquiry->email = $request->email;
        $dealerEnquiry->phone = $request->phone;
        $dealerEnquiry->message = $request->message;
        $dealerEnquiry->save();

        return response()->json([
            'message' => 'Enquiry has been sent, we will contact you shortly.'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ContactEnquiry $dealerEnquiry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ContactEnquiry $dealerEnquiry)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ContactEnquiry $dealerEnquiry)
    {
        $dealerEnquiry->delete();

        return response([
            'message' => 'Record has been deleted.'
        ]);
    }
}
