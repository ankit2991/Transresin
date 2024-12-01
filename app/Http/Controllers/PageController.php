<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return response()->json(Page::paginate($request?->limit ?: 20));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Page $page)
    {
        return response()->json($page);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Page $page)
    {
        $request->validate([
            'title'                  => 'required|string|max:255',
            'description'           => 'nullable|string',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $page->title            = $request->title;
        $page->slug             = Str::slug($request->title, '-');
        $page->description      = $request->description;
        $page->seo_title        = $request->seo_title;
        $page->seo_keywords     = $request->seo_keywords;
        $page->seo_description  = $request->seo_description;

        if (!empty($request->image)) {
            if (!empty($page->image)) unlink(public_path() . "/storage/" . $page->getRawOriginal('image'));
            $page->image         = dataUriToImage($request->image, "pages");
        }

        $page->save();

        return response()->json(['message' => 'Page updated successfully', 'page' => $page], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Page $page)
    {
        //
    }
}
