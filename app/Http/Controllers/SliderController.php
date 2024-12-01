<?php

namespace App\Http\Controllers;

use App\Models\Slider;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Slider::with('product');

        if (!empty($request?->search)) {
            $query->where("title", "LIKE", "%" . $request->search . "%");
        }

        if ($request?->type == "dropdown") {
            $sliders = $query->latest()->get();
        } else
            $sliders = $query->latest()->paginate(request()->limit ?: 10);

        return response()->json($sliders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'                 => 'required|string|max:255',
            'product_id'            => 'required|exists:products,id',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $slider = new Slider();
        $slider->title = $request->title;
        $slider->product_id = $request->product_id;

        if (!empty($request->image))
            $slider->image         = dataUriToImage($request->image, "sliders");

        $slider->save();

        return response()->json(['message' => 'Slider created successfully', 'slider' => $slider], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Slider $slider)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Slider $slider)
    {
        $request->validate([
            'title'                 => 'required|string|max:255',
            'product_id'            => 'nullable|exists:prodcuts,id',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $slider->title = $request->title;
        $slider->product_id = $request->product_id;

        if (!empty($request->image)) {
            if (!empty($slider->image)) unlink(public_path() . "/storage/" . $slider->getRawOriginal('image'));
            $slider->image         = dataUriToImage($request->image, "sliders");
        }

        $slider->save();

        return response()->json(['message' => 'Slider updated successfully', 'slider' => $slider], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Slider $slider)
    {
        $slider->delete();

        return response()->json([
            'message' => 'Slider has been deleted.'
        ]);
    }
}
