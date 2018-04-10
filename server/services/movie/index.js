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