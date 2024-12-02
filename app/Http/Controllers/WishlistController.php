<?php

namespace App\Http\Controllers;

use App\Models\Wishlist;
use Illuminate\Http\Request;

class WishlistController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = $request->user()->id;
        $productId = $request->product_id;
        $exists = Wishlist::where('user_id', $userId)->where('product_id',  $productId);

        if ($exists->count()) {
            $wishlist = $exists->first();
            $wishlist->delete();

            return response()->json([
                'message' => 'Removed from wishlist.'
            ]);
        } else {
            $wishlist = new Wishlist();
            $wishlist->product_id = $productId;
            $wishlist->user_id = $userId;
            $wishlist->save();

            return response()->json([
                'message' => 'Added to wishlist.'
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Wishlist $wishlist)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Wishlist $wishlist)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wishlist $wishlist)
    {
        //
    }
}
