<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request?->type == "dropdown") {
            $categories = Category::with(['children'])->orderBy('name')->whereNull('parent_category_id')->get();
        } else
            $categories = Category::with(['parent'])->latest()->paginate(request()->limit ?: 10);

        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'parent_category_id'    => 'nullable|exists:categories,id',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $category = new Category();
        $category->name = $request->name;
        $category->slug = Str::slug($request->name, '-');
        $category->parent_category_id = $request->parent_category_id;
        $category->seo_title = $request->seo_title;
        $category->seo_keywords = $request->seo_keywords;
        $category->seo_description = $request->seo_description;

        // if ($request->hasFile('image')) {
        //     $imagePath = $request->file('image')->store('categories', 'public');
        //     $category->image = $imagePath;
        // }
        if (!empty($request->image))
            $category->image         = dataUriToImage($request->image, "categories");

        $category->save();

        return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'parent_category_id'    => 'nullable|exists:categories,id',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $category->name = $request->name;
        $category->slug = Str::slug($request->name, '-');
        $category->parent_category_id = $request->parent_category_id;
        $category->seo_title = $request->seo_title;
        $category->seo_keywords = $request->seo_keywords;
        $category->seo_description = $request->seo_description;

        // if ($request->hasFile('image')) {
        //     $imagePath = $request->file('image')->store('categories', 'public');
        //     $category->image = $imagePath;
        // }



        if (!empty($request->image)) {
            if (!empty($category->image)) unlink(public_path() . "/storage/" . $category->getRawOriginal('image'));
            $category->image         = dataUriToImage($request->image, "categories");
        }

        $category->save();

        return response()->json(['message' => 'Category updated successfully', 'category' => $category], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([
            'message' => 'Category has been deleted.'
        ]);
    }
}
