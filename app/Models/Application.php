<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;

    public function getImageAttribute($image)
    {
        return $image ? asset('storage/' . $image) : null;
    }

    public function getRouteKeyName()
    {
        return 'slug';
    }

    public function parent()
    {
        return $this->belongsTo(Application::class, 'parent_application_id');
    }

    public function children()
    {
        return $this->hasMany(Application::class, 'parent_application_id');
    }
}
