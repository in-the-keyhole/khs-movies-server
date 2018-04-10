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

module.exports = {
    port: process.env.PORT || 3001,
    url: process.env.HEROKU_URL || 'http://localhost:3001/' ,

    jwt_secret: process.env.jwt_secret || 'lfanflaefknawelf',
    jwt_expires: process.env.jwt_expires || 3600,
    passwordCrypto: process.env.passwordCrypto || "k2312lk3m12l31",
    api_token: process.env.api_token || 'changemeplease',
    mongodb: process.env.MONGODB_URI || 'mongodb://localhost:27017/khs-movie',
    session_timeout: process.env.SESSION_TIMEOUT || 5,
}