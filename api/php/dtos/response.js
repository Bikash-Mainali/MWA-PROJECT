/**
 * response.js
 */

"use strict"

// This can be used for future purpose for hardening
class ResponseModel {
    constructor(message, data) {
        this.success = (!data) ? false : true,
        this.message = message
        this.data = data;
    }
}

module.exports = ResponseModel
