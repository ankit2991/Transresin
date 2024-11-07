<?php

namespace App\Http\Controllers;

use App\Models\IndustryCategory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class IndustryCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request?->type == "dropdown") {
            $industry = IndustryCategory::with(['children'])->orderBy('name')->whereNull('parent_industry_id')->get();
        } else
            $industry = IndustryCategory::with(['parent'])->latest()->paginate(request()->limit ?: 10);

        return response()->json($industry);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'parent_industry_id'    => 'nullable|exists:industry$industry,id',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $industry = new IndustryCategory();
        $industry->name = $request->name;
        $industry->slug = Str::slug($request->name, '-');
        $industry->parent_industry_id = $request->parent_industry_id;
        $industry->seo_title = $request->seo_title;
        $industry->seo_keywords = $request->seo_keywords;
        $industry->seo_description = $request->seo_description;

        if (!empty($request->image))
            $industry->image         = dataUriToImage($request->image, "industry_categories");

        $industry->save();

        return response()->json(['message' => 'Industry created successfully', 'industry' => $industry], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(IndustryCategory $industry)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, IndustryCategory $industry)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'parent_industry_id'    => 'nullable|exists:industry$industry,id',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $industry->name = $request->name;
        $industry->slug = Str::slug($request->name, '-');
        $industry->parent_industry_id = $request->parent_industry_id;
        $industry->seo_title = $request->seo_title;
        $industry->seo_keywords = $request->seo_keywords;
        $industry->seo_description = $request->seo_description;

        if (!empty($request->image)) {
            if (!empty($industry->image)) unlink(public_path() . "/storage/" . $industry->getRawOriginal('image'));
            $industry->image         = dataUriToImage($request->image, "industry_categories");
        }

        $industry->save();

        return response()->json(['message' => 'Industry updated successfully', 'industry' => $industry], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(IndustryCategory $application)
    {
        $application->delete();

        return response()->json([
            'message' => 'IndustryCategory has been deleted.'
        ]);
    }
}
