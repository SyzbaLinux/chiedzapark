<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function  Attributefullname(): string
    {
        return $this->first_name .' '.$this->middle_name.' ' . $this->last_name;
    }
}
