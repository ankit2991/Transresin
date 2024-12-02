<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Review::where('user_id', $request->user()->id);

        if ($request?->type == "dropdown") {
            $reviews = $query->latest()->get();
        } else {
            $reviews = $query->latest()->paginate($request?->limit ?: 10);
        }

        return response()->json($reviews);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'review' => 'required|string',
            'rating' => 'required|integer|min:1|max:5',
        ]);

        // return response()->json($request->images);

        $images = [];

        if (!empty($request->images)) {
            foreach ($request->images as $img) {
                $images[] = [
                    "title" => $img["title"],
                    "src" => dataUriToImage($img["src"][0]["image"], 'reviews')
                ];
            }
        }

        $review = new Review();
        $review->user_id = $request->user()->id;
        $review->product_id = $request->product_id;
        $review->review = $request->review;
        $review->rating = $request->rating;
        $review->images = $images;
        $review->save();

        return response()->json(['message' => 'Review submitted successfully', 'review' => $review], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        //
    }
}
