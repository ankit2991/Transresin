<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Application;
use App\Models\Brands;
use App\Models\Category;
use App\Models\IndustryCategory;
use App\Models\Product;
use App\Models\ProductPackage;
use App\Models\Testimonial;
use App\Models\Video;

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
                "slug" => "application",
                "data" => $applications
            ],
            [
                "name" => "Product Category",
                "slug" => "category",
                "data" => $categories
            ],
            [
                "name" => "Industry Category",
                "slug" => "industry-category",
                "data" => $industyCategories
            ],
            [
                "name" => "Brands",
                "slug" => "brand",
                "data" => $brands
            ],
        ];

        return response()->json($resArr);
    }

    public function front()
    {
        $resArr = [
            'applications' => Application::orderBy('name')->whereNull('parent_application_id')->skip(0)->take(12)->get(),
            'products' => Product::with('packages')->whereHas('packages', function ($q) {
                $q->where('discount', '>', 0);
            })->skip(0)->take(5)->get(),
            'videos' => Video::latest()->get(),
            'reviews' => Testimonial::latest()->get()
        ];
        return response()->json($resArr);
    }
}
