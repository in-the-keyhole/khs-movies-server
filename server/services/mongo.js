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

var MongoClient = require('mongodb').MongoClient;
var config = require('../config');

var url = config.mongodb;

module.exports = {
    Get: Get,
    Insert: Insert,
    Update: Update
}

function Get(query, collectionName) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject("Failed to Connect to MongoDB ", err);
            }

            return resolve(db.collection(collectionName).find(query).toArray());
        });
    });
}

function Insert(query, collectionName) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject("Failed to Connect to MongoDB ", err);
            }

            return resolve(db.collection(collectionName).insert(query));
        });
    });
}

function Update(query, data, collectionName, options) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, function (err, db) {
            if (err) {
                reject("Failed to Connect to MongoDB ", err);
            }

            return resolve(db.collection(collectionName).update(query, data, options));
        });
    });
}


