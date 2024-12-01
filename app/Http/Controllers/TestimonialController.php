<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TestimonialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request?->type == "dropdown") {
            $testimonials = Testimonial::orderBy('name')->get();
        } else
            $testimonials = Testimonial::latest()->paginate(request()->limit ?: 10);

        return response()->json($testimonials);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'place'                 => 'required|string|max:255',
            'comment'               => 'required|string',
            'rating'                => 'required|numeric|min:1|max:5',
        ]);

        $testimonial = new Testimonial();
        $testimonial->name = $request->name;
        $testimonial->place = $request->place;
        $testimonial->comment = $request->comment;
        $testimonial->rating = $request->rating;

        if (!empty($request->image))
            $testimonial->image         = dataUriToImage($request->image, "testimonials");

        $testimonial->save();

        return response()->json(['message' => 'Testimonial created successfully', 'testimonial' => $testimonial], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Testimonial $testimonial)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Testimonial $testimonial)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'place'                 => 'required|string|max:255',
            'comment'               => 'required|string',
            'rating'                => 'required|numeric|min:1|max:5',
        ]);

        $testimonial->name = $request->name;
        $testimonial->place = $request->place;
        $testimonial->comment = $request->comment;
        $testimonial->rating = $request->rating;

        if (!empty($request->image)) {
            if (!empty($testimonial->image)) unlink(public_path() . "/storage/" . $testimonial->getRawOriginal('image'));
            $testimonial->image         = dataUriToImage($request->image, "testimonials");
        }

        $testimonial->save();

        return response()->json(['message' => 'Testimonial updated successfully', 'testimonial' => $testimonial], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Testimonial $testimonial)
    {
        if (!empty($testimonial->image)) unlink(public_path() . "/storage/" . $testimonial->getRawOriginal('image'));
        $testimonial->delete();

        return response()->json([
            'message' => 'Testimonial has been deleted.'
        ]);
    }
}
