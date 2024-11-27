<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request?->type == "dropdown") {
            $materials = Material::orderBy('name')->get();
        } else {
            $materials = Material::latest()->paginate(request()->limit ?: 10);
        }

        return response()->json($materials);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:materials,name',
        ]);

        $material = new Material();
        $material->name = $request->name;

        if (!empty($request->image))
            $material->image         = dataUriToImage($request->image, "materials");

        $material->save();

        return response()->json(['message' => 'Material created successfully', 'material' => $material], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Material $material)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Material $material)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:materials,name,' . $material->id,
        ]);

        $material->name = $request->name;

        if (!empty($request->image)) {
            if (!empty($material->image)) unlink(public_path() . "/storage/" . $material->getRawOriginal('image'));
            $material->image         = dataUriToImage($request->image, "materials");
        }

        $material->save();

        return response()->json(['message' => 'Material updated successfully', 'material' => $material], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Material $material)
    {
        if (!empty($material->image)) unlink(public_path() . "/storage/" . $material->getRawOriginal('image'));
        $material->delete();

        return response()->json([
            'message' => 'Material has been deleted.'
        ]);
    }
}
