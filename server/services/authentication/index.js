/*
Copyright 2017 Keyhole Software LLC

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

var jwt = require('jsonwebtoken');
var config = require('../../config');
var logger = require('log4js').getDefaultLogger();
var mongo = require('../mongo');
const crypto = require('crypto');
const secret = config.passwordCrypto;

function encodePassword(password) {
    var hash = crypto.createHmac('sha512', secret);
    hash.update(password);
    var temp = hash.digest('hex');
    return temp;
}

function auth(email, password) {
    return new Promise(function (resolve, reject) {
        try {
            mongo.Get({
                email: email,
                status: {
                    $ne: "removed"
                }
            }, "USERS")
                .then(function (docs) {

                    if (docs.length === 0) {
                        return reject();
                    }
                    var user = docs[0];
                    if (user.password === encodePassword(password)) {
                        var expiresIn = {
                            expiresIn: Date.now() + config.jwt_expires
                        };

                        var obj = {
                            email: email,
                            date: Date.now(),
                            status: user.Status
                        };

                        var token = jwt.sign(obj, config.jwt_secret, expiresIn);

                        user.token = token;
                        user.apitoken = config.api_token;
                        return resolve(user);
                    } else {
                        return reject("Authentication failed");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                    return reject("Authentication failed");
                });

        } catch (ex) {
            return reject(ex);
        }

    });
}

function verify(token) {
    return new Promise(function (resolve, reject) {
        try {
            var obj = jwt.verify(token, config.jwt_secret);
            resolve(obj);

        } catch (ex) {
            reject(ex);
        }
    })
}

function isAuth(req, res, next) {
    var token = req.headers['token'] || ''
    verify(token).then(function (obj) {
        req.use = obj;
        next();
    })
        .catch(function (err) {
            //logger.info(err);
            res.sendStatus(403);
        });
}

function isAuthAdmin(req, res, next) {
    var token = req.headers['token'] || ''
    verify(token).then(function (obj) {
        if (obj.status == 'admin') {
            req.use = obj;
            next();
        } else {
            res.sendStatus(403);
            }

        })
        .catch(function (err) {
            //logger.info(err);
            res.sendStatus(403);

        });
}


module.exports = {
    isAuth: isAuth,
    auth: auth,
    isAuthAdmin: isAuthAdmin
}
