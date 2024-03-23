<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;

Route::middleware('auth')->group(function () {
    Route::get('category', [CategoryController::class, 'index'])
        ->name('category');

    Route::get('category/create', [CategoryController::class, 'create'])
        ->name('category.create');

    Route::get('/category/{category}/edit', [CategoryController::class, 'edit'])->name('category.edit');

    Route::get('/category/{category}', [CategoryController::class, 'show'])
        ->name('category.show');

    Route::post('/category', [CategoryController::class, 'store'])->name('category.store');

    Route::patch('/category/{category}', [CategoryController::class, 'update'])->name('category.update');

    Route::delete('/category/{category}', [CategoryController::class, 'destroy'])->name('category.destroy');
});
