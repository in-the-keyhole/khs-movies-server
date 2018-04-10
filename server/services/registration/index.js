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
var uuid = require('uuid');

function encodePassword(password) {
    var hash = crypto.createHmac('sha512', secret);
    hash.update(password);
    var temp = hash.digest('hex');
    return temp;
}

function registration(email, password,confirmPassword) {
    return new Promise(function (resolve, reject) {

       if (password!=confirmPassword){
            return reject("passwords shoule be the same!");
       }

        mongo.Get({
            email: email

        }, "USERS")
            .then(function (response) {
                if (response.length > 0) {
                    return reject("The email is already registered");
                } else {
                    var id = uuid();
                    var data = {
                        uuid: id,
                        email: email,
                        status: 'user',
                        password: encodePassword(password)
                    }
                    mongo
                        .Insert(data, 'USERS')
                        .then(function (contact) {
                            console.log('Contact   ' + contact);
                            return resolve("registered successed");
                        })
                        .catch(function (error) {
                            return reject("registered failed");
                        });;
                }
            })
            .catch(function (error) {
                console.log("registration failed  " + error);
                return reject("registered failed" +error );
            });
    })

}

module.exports = {
    registration: registration
}
