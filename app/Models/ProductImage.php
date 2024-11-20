<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_id',
        'title',
        'image_type',
        'image', // Image file path or base64 encoded data
    ];

    /**
     * Get the product associated with the product image.
     */
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function getImageAttribute($image)
    {
        return $image ? asset('storage/' . $image) : null;
    }
}
