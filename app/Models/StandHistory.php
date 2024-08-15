<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StandHistory extends Model
{
    use HasFactory;

    public function project(): belongsTo
    {
        return $this->belongsTo(Project::class);
    }


    public function stand(): belongsTo
    {
        return $this->belongsTo(Stand::class);
    }
}
