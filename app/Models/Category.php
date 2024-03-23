<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Database\Query\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Category extends Model
{
    use HasFactory, SoftDeletes, HasUuids;

    protected $fillable = [
        'name',
    ];

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = ucfirst($value);
    }

    public function scopeSearch(Builder $query, $value)
    {
        $query->when($value ?? false, function ($query, $value) {
            return $query->where('name', 'LIKE', '%' . $value . '%');
        });
    }

    public function scopeFilter(Builder $query, $value): void
    {
        $query->when($value['created_at'] ?? false, function ($query, $value) {
            return $query->where('created_at', $value);
        });

        $query->when($value['updated_at'] ?? false, function ($query, $value) {
            return $query->where('updated_at', $value);
        });
    }

    public function scopeSort(Builder $query, $sortBy): void
    {
        $query->when($sortBy ?? false, function ($query, $sort) {
            $sortby = explode(":", $sort);
            $field = $sortby[0];
            $order = $sortby[1];

            return $query->orderBy($field, $order);
        });
    }
}
