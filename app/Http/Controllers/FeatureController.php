<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request?->type == "dropdown") {
            $features = Feature::orderBy('name')->get();
        } else {
            $features = Feature::latest()->paginate(request()->limit ?: 10);
        }

        return response()->json($features);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:features,name',
        ]);

        $feature = new Feature();
        $feature->name = $request->name;

        if (!empty($request->image))
            $feature->image         = dataUriToImage($request->image, "features");

        $feature->save();

        return response()->json(['message' => 'Feature created successfully', 'feature' => $feature], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:features,name,' . $feature->id,
        ]);

        $feature->name = $request->name;

        if (!empty($request->image)) {
            if (!empty($feature->image)) unlink(public_path() . "/storage/" . $feature->getRawOriginal('image'));
            $feature->image         = dataUriToImage($request->image, "features");
        }

        $feature->save();

        return response()->json(['message' => 'Feature updated successfully', 'feature' => $feature], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        if (!empty($feature->image)) unlink(public_path() . "/storage/" . $feature->getRawOriginal('image'));
        $feature->delete();

        return response()->json([
            'message' => 'Feature has been deleted.'
        ]);
    }
}
