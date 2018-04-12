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

var mongo = require('../mongo');

function addMovie(movie) {
    return new Promise(function (resolve, reject) {

        mongo
            .Insert(movie, 'MOVIES')
            .then(function (movie) {
                console.log('Contact   ' + movie);
                return resolve("movie adding successed");
            })
            .catch(function (error) {
                return reject("movie add failed");
            });;

    })
}

function findAllMovies() {
    return new Promise(function (resolve, reject) {
        try {
            mongo.Get(({
                id: {
                    $ne: ''
                }
            }), "MOVIES")
                .then(function (docs) {
                    return resolve(docs);
                })
                .catch(function (error) {
                    console.log(error);
                    return reject("findAllMovies failed");
                });

        } catch (ex) {
            return reject(ex);
        }
    });
}

function rating(movie, rating) {

    return new Promise(function (resolve, reject) {
        try {
            mongo.Get(({id: movie.id}), "MOVIES")
                .then(function (movies) {
                    var movie =movies[0];
                    movie.rating = rating;
                    mongo.Update({
                        id: movie.id
                    }, movie, "MOVIES")
                        .then(function (docs) {
                            return resolve(docs);
                        })
                        .catch(function (error) {
                            console.log(error);
                            return reject("rating update failed");
                        });
                })
                .catch(function (error) {
                    console.log(error);
                    return reject("find Movies failed");
                });
        } catch (ex) {
            return reject(ex);
        }
    });

}
module.exports = {
    addMovie: addMovie,
    findAllMovies: findAllMovies,
    rating: rating
}