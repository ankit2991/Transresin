<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function getImageAttribute($image)
    {
        return $image ? asset('storage/' . $image) : null;
    }

    /**
     * Get the category associated with the product.
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the subcategory associated with the product.
     */
    public function subCategory()
    {
        return $this->belongsTo(Category::class, 'sub_category_id');
    }

    /**
     * Get the industry category associated with the product.
     */
    public function industryCategory()
    {
        return $this->belongsTo(IndustryCategory::class);
    }

    /**
     * Get the sub-industry category associated with the product.
     */
    public function subIndustryCategory()
    {
        return $this->belongsTo(IndustryCategory::class, 'sub_industry_category_id');
    }

    /**
     * Get the application associated with the product.
     */
    public function application()
    {
        return $this->belongsTo(Application::class);
    }

    /**
     * Get the sub-application associated with the product.
     */
    public function subApplication()
    {
        return $this->belongsTo(Application::class, 'sub_application_id');
    }

    /**
     * Get the brand associated with the product.
     */
    public function brand()
    {
        return $this->belongsTo(Brands::class);
    }

    /**
     * Get the HSN code associated with the product.
     */
    public function hsnCode()
    {
        return $this->belongsTo(HsnCode::class);
    }

    /**
     * Get all the images for the product.
     */
    public function productImages()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function packages()
    {
        return $this->hasMany(ProductPackage::class);
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class, 'product_features');
    }

    public function materials()
    {
        return $this->belongsToMany(Material::class, 'product_materials');
    }
}
