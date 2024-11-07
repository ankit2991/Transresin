<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if ($request?->type == "dropdown") {
            $applications = Application::with(['children'])->orderBy('name')->whereNull('parent_application_id')->get();
        } else
            $applications = Application::with(['parent'])->latest()->paginate(request()->limit ?: 10);

        return response()->json($applications);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'parent_application_id' => 'nullable|exists:applications,id',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $application = new Application();
        $application->name = $request->name;
        $application->slug = Str::slug($request->name, '-');
        $application->parent_application_id = $request->parent_application_id;
        $application->seo_title = $request->seo_title;
        $application->seo_keywords = $request->seo_keywords;
        $application->seo_description = $request->seo_description;

        if (!empty($request->image))
            $application->image         = dataUriToImage($request->image, "applications");

        $application->save();

        return response()->json(['message' => 'Application created successfully', 'application' => $application], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Application $application)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Application $application)
    {
        $request->validate([
            'name'                  => 'required|string|max:255',
            'parent_application_id' => 'nullable|exists:applications,id',
            'seo_title'             => 'nullable|string|max:255',
            'seo_keywords'          => 'nullable|string',
            'seo_description'       => 'nullable|string',
        ]);

        $application->name = $request->name;
        $application->slug = Str::slug($request->name, '-');
        $application->parent_application_id = $request->parent_application_id;
        $application->seo_title = $request->seo_title;
        $application->seo_keywords = $request->seo_keywords;
        $application->seo_description = $request->seo_description;

        if (!empty($request->image)) {
            if (!empty($application->image)) unlink(public_path() . "/storage/" . $application->getRawOriginal('image'));
            $application->image         = dataUriToImage($request->image, "applications");
        }

        $application->save();

        return response()->json(['message' => 'Application updated successfully', 'application' => $application], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Application $application)
    {
        $application->delete();

        return response()->json([
            'message' => 'Application has been deleted.'
        ]);
    }
}
