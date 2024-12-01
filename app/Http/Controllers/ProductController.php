<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductFeature;
use App\Models\ProductImage;
use App\Models\ProductPackage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query();

        if (!empty($request->application)) {
            $query->whereHas('application', function ($q) use ($request) {
                $q->where('slug', $request->application);
            });
        }
        if (!empty($request->sub_application)) {
            $query->whereHas('subApplication', function ($q) use ($request) {
                $q->where('slug', $request->sub_application);
            });
        }
        if (!empty($request->category)) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }
        if (!empty($request->industry_category)) {
            $query->whereHas('industry_category', function ($q) use ($request) {
                $q->where('slug', $request->industry_category);
            });
        }
        if (!empty($request->brand)) {
            $query->whereHas('brand', function ($q) use ($request) {
                $q->where('slug', $request->brand);
            });
        }

        if ($request?->type == "dropdown") {
            $products = $query->orderBy('name')->select('id', 'name')->get();
        } else {
            // Apply pagination limit if provided, otherwise default to 10
            $products = $query->with(['category', 'industryCategory', 'application', 'brand', 'hsnCode', 'packages'])->latest()->paginate($request->get('limit', 10));
        }


        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:products|max:255',
            'description1' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'nullable|exists:categories,id',
            'industry_category_id' => 'nullable|exists:industry_categories,id',
            'sub_industry_category_id' => 'nullable|exists:industry_categories,id',
            'application_id' => 'nullable|exists:applications,id',
            'sub_application_id' => 'nullable|exists:applications,id',
            'brand_id' => 'nullable|exists:brands,id',
            'hsn_code_id' => 'nullable|exists:hsn_codes,id',
            'regular_price' => 'nullable|numeric',
            'discount' => 'nullable|numeric',
            'trade_price' => 'nullable|numeric',
            'seo_title' => 'nullable|string|max:255',
            'seo_keywords' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'image' => 'nullable|string', // For main product image (base64 data URI or URL)
            'images' => 'nullable|array', // For additional product images
            'images.*.image' => 'nullable|string', // base64 data URI for each image
            'images.*.title' => 'nullable|string|max:255',
            'images.*.image_type' => 'nullable|string|max:50', // Image type like 'main', 'thumbnail', etc.
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Create new Product instance
        $product = Product::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name, '-'),
            'description1' => $request->description1,
            'description2' => $request->description2,
            'description3' => $request->description3,
            'search_keywords' => $request->search_keywords,
            'category_id' => $request->category_id,
            // 'sub_category_id' => $request->sub_category_id,
            'industry_category_id' => $request->industry_category_id,
            // 'sub_industry_category_id' => $request->sub_industry_category_id,
            'application_id' => $request->application_id,
            'sub_application_id' => $request->sub_application_id,
            'brand_id' => $request->brand_id,
            'hsn_code_id' => $request->hsn_code_id,
            // 'regular_price' => $request->regular_price,
            // 'discount' => $request->discount,
            // 'trade_price' => $request->trade_price,
            'seo_title' => $request->seo_title,
            'seo_keywords' => $request->seo_keywords,
            'seo_description' => $request->seo_description,
        ]);

        // Handle the main image (if provided)
        if (!empty($request->image)) {
            $product->image = dataUriToImage($request->image, 'products');
        }

        $product->save();

        $product->features()->sync($request->features);
        $product->materials()->sync($request->materials);

        if (!empty($request->packagings)) {
            foreach ($request->packagings as $package) {
                $productPackage = new ProductPackage();
                $productPackage->product_id = $product->id;
                $productPackage->name = $package['name'];
                $productPackage->composition = $package['composition'];
                $productPackage->regular_price = $package['regular_price'];
                $productPackage->discount = $package['discount'];
                $productPackage->trade_price = $package['trade_price'];

                if (!empty($package['image'])) {
                    $productPackage->image = dataUriToImage($package['image'], "products/{$product->id}/packages");
                }

                $productPackage->save();
            }
        }

        // Handle additional product images
        if (!empty($request->images)) {
            foreach ($request->images as $pImg) {
                foreach ($pImg['src'] as $index => $src) {
                    switch ($index) {
                        case 0:
                            $type = "main";
                            break;
                        case 1:
                            $type = "medium";
                            break;
                        case 2:
                            $type = "thumb";
                            break;
                        default:
                            $type = "main";
                    }

                    $productImage = new ProductImage();
                    $productImage->product_id = $product->id;
                    $productImage->title = $pImg['title'] ?? null;
                    $productImage->image_type = $type;

                    if (!empty($src['image'])) {
                        $productImage->image = dataUriToImage($src['image'], 'products');
                    }

                    $productImage->save();
                }
            }
        }

        return response()->json(['message' => 'Product created successfully', 'product' => $product], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($productSlug)
    {
        // dd($productSlug);
        $product = Product::with([
            'productImages',
            'packages',
            'features',
            'materials'
        ])->where('slug', $productSlug)->firstOrFail();

        // dd($product);

        return response()->json($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        // Validate incoming request
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255|unique:products,name,' . $product->id, // Ensure name is unique except for this product
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'nullable|exists:categories,id',
            'industry_category_id' => 'nullable|exists:industry_categories,id',
            'sub_industry_category_id' => 'nullable|exists:industry_categories,id',
            'application_id' => 'nullable|exists:applications,id',
            'sub_application_id' => 'nullable|exists:applications,id',
            'brand_id' => 'nullable|exists:brands,id',
            'hsn_code_id' => 'nullable|exists:hsn_codes,id',
            'regular_price' => 'nullable|numeric',
            'discount' => 'nullable|numeric',
            'trade_price' => 'nullable|numeric',
            'seo_title' => 'nullable|string|max:255',
            'seo_keywords' => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'image' => 'nullable|string', // For main product image (base64 data URI or URL)
            'images' => 'nullable|array', // For additional product images
            'images.*.image' => 'nullable|string', // base64 data URI for each image
            'images.*.title' => 'nullable|string|max:255',
            'images.*.image_type' => 'nullable|string|max:50',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update product attributes
        $product->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name, '-'),
            'description' => $request->description,
            'search_keywords' => $request->search_keywords,
            'category_id' => $request->category_id,
            'sub_category_id' => $request->sub_category_id,
            'industry_category_id' => $request->industry_category_id,
            'sub_industry_category_id' => $request->sub_industry_category_id,
            'application_id' => $request->application_id,
            'sub_application_id' => $request->sub_application_id,
            'brand_id' => $request->brand_id,
            'hsn_code_id' => $request->hsn_code_id,
            'regular_price' => $request->regular_price,
            'discount' => $request->discount,
            'trade_price' => $request->trade_price,
            'seo_title' => $request->seo_title,
            'seo_keywords' => $request->seo_keywords,
            'seo_description' => $request->seo_description,
        ]);

        // Update the main image if provided
        if (!empty($request->image)) {
            $product->image = dataUriToImage($request->image, 'products');
        }

        // Update additional images if provided
        if (!empty($request->images)) {
            foreach ($request->images as $pImg) {
                foreach ($pImg['src'] as $index => $src) {
                    switch ($index) {
                        case 0:
                            $type = "main";
                            break;
                        case 1:
                            $type = "medium";
                            break;
                        case 2:
                            $type = "thumb";
                            break;
                        default:
                            $type = "main";
                    }

                    $productImage = new ProductImage();
                    $productImage->product_id = $product->id;
                    $productImage->title = $pImg['title'] ?? null;
                    $productImage->image_type = $type;

                    if (!empty($src['image'])) {
                        $productImage->image = dataUriToImage($src['image'], 'products');
                    }

                    $productImage->save();
                }
            }
        }

        return response()->json(['message' => 'Product updated successfully', 'product' => $product], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Deleting the product and associated product images
        $product->productImages()->delete();
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function cart(Request $request)
    {
        $cartItems = [];

        if (!empty($request->cartItems)) {
            foreach ($request->cartItems as $pId => $qty) {
                $product = ProductPackage::with(['product'])->has('product')->findOrFail($pId);
                $product->qty = $qty;
                $cartItems[] = $product;
            }
        }

        return $cartItems;
    }
}
