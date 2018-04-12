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

var express = require('express');
var router = express.Router();
var controller = require('./controller');
var auth = require('../../services/authentication');

module.exports = function (app) {

    router.get('/', auth.isAuth,controller.findAllMovies);
    router.get('/:id', auth.isAuth,controller.findMovieById);
    router.post('/addMovie',auth.isAuth,controller.addMovie )
    router.post('/rating',auth.isAuth,controller.rating )
    app.use('/api/movies', auth.isAuth,router);
}
