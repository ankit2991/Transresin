<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Brands;
use App\Models\Category;
use App\Models\IndustryCategory;

class HomeController extends Controller
{
    public function index()
    {
        $categories = Category::with(['children'])->orderBy('name')->whereNull('parent_category_id')->get();

        $applications = Application::with(['children'])->orderBy('name')->whereNull('parent_application_id')->get();

        $industyCategories = IndustryCategory::with(['children'])->orderBy('name')->whereNull('parent_industry_id')->get();

        $brands = Brands::orderBy('name')->get();

        $resArr = [
            [
                "name" => "Product By Application",
                "slug" => "product-application",
                "data" => $applications
            ],
            [
                "name" => "Product Category",
                "slug" => "product-category",
                "data" => $categories
            ],
            [
                "name" => "Industy Category",
                "slug" => "industy-category",
                "data" => $industyCategories
            ],
            [
                "name" => "Brands",
                "slug" => "brands",
                "data" => $brands
            ],
        ];

        return response()->json($resArr);
    }
}
