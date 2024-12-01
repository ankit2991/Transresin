<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    public $guarded = [];

    public function products()
    {
        return $this->belongsToMany(ProductPackage::class, 'order_products')->withPivot(['price', 'qty']);
    }

    public function getRouteKeyName()
    {
        return 'order_token';
    }
}
