<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $with = ["user"];

    protected $casts = [
        "images" => "array"
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
