<?php

namespace App\Http\Controllers;

use App\Models\HsnCode;
use Illuminate\Http\Request;

class HsnCodeController extends Controller
{
    // Display a listing of the HSN Codes
    public function index(Request $request)
    {
        if ($request?->type == "dropdown")
            $hsnCodes = HsnCode::orderBy('code')->get();
        else
            $hsnCodes = HsnCode::latest()->paginate(request()?->limit ?: 10);

        return response()->json($hsnCodes);
    }

    // Store a new HSN Code
    public function store(Request $request)
    {
        $request->validate([
            'code' => 'required|unique:hsn_codes,code',
            'description' => 'nullable|string',
            'gst_rate' => 'required|numeric',
        ]);

        $hsnCode = HsnCode::create($request->all());
        return response()->json(['message' => 'Success! Record has been added.', 'data' => $hsnCode], 201);
    }

    // Display the specified HSN Code
    public function show($id)
    {
        $hsnCode = HsnCode::findOrFail($id);
        return response()->json($hsnCode);
    }

    // Update the specified HSN Code
    public function update(Request $request, $id)
    {
        $hsnCode = HsnCode::findOrFail($id);

        $request->validate([
            'code' => 'required|unique:hsn_codes,code,' . $id,
            'description' => 'nullable|string',
            'gst_rate' => 'required|numeric',
        ]);

        $hsnCode->update($request->all());

        return response()->json(['message' => 'Success! Record has been updated.', 'data' => $hsnCode]);
    }

    // Remove the specified HSN Code
    public function destroy($id)
    {
        $hsnCode = HsnCode::findOrFail($id);
        $hsnCode->delete();
        return response()->json(['message' => 'Success! Record has been deleted.'], 204);
    }
}
