<?php

namespace App\Http\Controllers;

use App\Models\Score;
use App\Http\Requests\StoreScoreRequest;
use App\Http\Requests\UpdateScoreRequest;
use App\Http\Resources\ScoreResource;

class ScoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ScoreResource::collection(
            Score::orderBy('score', 'desc')->paginate(10)
        );
    }

    /**
     * Show the form for creating a new resource.           
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreScoreRequest $request)
    {
        $data = $request->validated();
        $score = Score::create($data);
        return response(new ScoreResource($score), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Score $score)
    {
        return new ScoreResource($score);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Score $score)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateScoreRequest $request, Score $score)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Score $score)
    {
        //
    }
}
