<?php

namespace App\Http\Controllers;

use App\Models\Video;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class VideoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request?->type == "dropdown") {
            $videos = Video::get();
        } else
            $videos = Video::latest()->paginate(request()->limit ?: 10);

        return response()->json($videos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'title'               => 'required|string|max:255',
            'youtube_video_url'   => 'required|string|max:255',
        ]);

        $video = new Video();
        $video->title = $request->title;
        $video->youtube_video_url = $request->youtube_video_url;
        $video->save();

        return response()->json(['message' => 'Video added successfully', 'video' => $video], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Video $video)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Video $video)
    {
        $request->validate([
            'title'                  => 'required|string|max:255',
            'youtube_video_url'      => 'required|string|max:255',
        ]);


        $video->title = $request->title;
        $video->youtube_video_url = $request->youtube_video_url;
        $video->save();

        return response()->json(['message' => 'Video updated successfully', 'video' => $video], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Video $video)
    {
        $video->delete();

        return response()->json([
            'message' => 'Video has been deleted.'
        ]);
    }
}
