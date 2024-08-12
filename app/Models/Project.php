<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    public function active()
    {
        return $this->hasMany(AgreementOfSale::class)->where('is_cancelled', 0);
    }

    public function cancelled()
    {
        return $this->hasMany(AgreementOfSale::class)->where('is_cancelled', 1);
    }

    public function batches()
    {
        return $this->hasMany(Batch::class);
    }
}
