/*
Copyright 2018 Keyhole Software LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

'use strict';
var uuid = require('uuid');
//var movies = require('../../movie/now_playing.json').results;
var movies = [];
var movieService = require('../../services/movie');

function findAllMovies(req, res) {
    movieService
        .findAllMovies()
        .then((response) => {
            movies = response;
            res
            .status(200)
            .json(movies);
        })
        .catch((error) => {
            console.log('fetch Movie failed')
        });
   
}

function findMovieById(req, res) {
    var id = req.params.id;
    var movie = movies.filter(movie => movie.id == id);
    res
        .status(200)
        .json(movie[0]);
}

function addMovie(req, res) {

    var id = uuid();
    var movie = {
        id: id,
        poster_path: req.body.poster_path,
        adult: req.body.adult,
        overview: req.body.overview,
        release_date: req.body.release_date,
        genre_ids: req.body.genre_ids,
        original_language: req.body.original_language,
        original_title: req.body.original_title,
        title: req.body.title,
        backdrop_path: req.body.backdrop_path,
        popularity: req.body.popularity,
        vote_count: req.body.vote_count,
        video: req.body.video,
        vote_average: req.body.vote_average
    };
    movieService
        .addMovie(movie)
        .then(function (response) {
            res.send(response);
        })
        .catch(function (err) {
            res.sendStatus(403);
        });
}

function rating (req, res){
   var rating = req.body.rating;
   var movie = req.body.movie;

    movieService
    .rating(movie, rating)
    .then(function (response) {
        res.send(response);
    })
    .catch(function (err) {
        res.sendStatus(403);
    });
}
module.exports = {
    findAllMovies: findAllMovies,
    findMovieById: findMovieById,
    addMovie: addMovie,
    rating:rating
}