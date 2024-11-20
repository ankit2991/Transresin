<?php

namespace App\Http\Controllers;

use App\Models\Brands;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request?->type == "dropdown") {
            $brands = Brands::with(['children'])->orderBy('name')->get();
        } else
            $brands = Brands::with(['parent'])->latest()->paginate(request()->limit ?: 10);

        return response()->json($brands);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'parent_brand_id'       => 'nullable|exists:brands,id',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $brand = new Brands();
        $brand->name = $request->name;
        $brand->slug = Str::slug($request->name, '-');
        $brand->parent_brand_id = $request->parent_brand_id;
        $brand->seo_title = $request->seo_title;
        $brand->seo_keywords = $request->seo_keywords;
        $brand->seo_description = $request->seo_description;

        if (!empty($request->image))
            $brand->image         = dataUriToImage($request->image, "brands");

        $brand->save();

        return response()->json(['message' => 'Brands created successfully', 'brand' => $brand], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brands $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brands $brand)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'parent_brand_id'       => 'nullable|exists:brands,id',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $brand->name = $request->name;
        $brand->slug = Str::slug($request->name, '-');
        $brand->parent_brand_id = $request->parent_brand_id;
        $brand->seo_title = $request->seo_title;
        $brand->seo_keywords = $request->seo_keywords;
        $brand->seo_description = $request->seo_description;

        if (!empty($request->image)) {
            if (!empty($brand->image)) unlink(public_path() . "/storage/" . $brand->getRawOriginal('image'));
            $brand->image         = dataUriToImage($request->image, "brands");
        }

        $brand->save();

        return response()->json(['message' => 'Brands updated successfully', 'brand' => $brand], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brands $brand)
    {
        $brand->delete();

        return response()->json([
            'message' => 'Brands has been deleted.'
        ]);
    }
}
