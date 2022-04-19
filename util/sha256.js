var crypto = require('crypto');

/**
 * Returns sha-256 hash of given input in base 64
 * @param {*} input 
 */
function sha256(input) {
    return crypto.createHash('sha256').update(input).digest("base64");
}

module.exports = sha256;
