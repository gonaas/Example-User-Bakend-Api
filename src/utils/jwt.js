const jwt = require("jsonwebtoken");
const config = require("../config");

/**
 * Generate a new valid JWT with any time validation.
 *
 * @param  {Object} payload
 * @return {String}
 */
const generateJWTCustomTime = (payload, time) =>
  jwt.sign(payload, config.jwt.private, {
    expiresIn: time,
    algorithm: "RS256",
  });

/**
 * Generate a new valid JWT.
 *
 * @param  {Object} payload
 * @return {String}
 */
const generateJWT = (payload) => {
  return jwt.sign(payload, config.jwt.private, {
    expiresIn: config.jwt.expiresIn,
    algorithm: "RS256",
  });
};

/**
 * Verify JWT and return payload.
 *
 * @param  {String} token
 * @return {Object}
 */
const verifyJWT = (token) => {
  let publicKey = config.jwt.public;
  const payload = jwt.verify(token, publicKey, { algorithm: "RS256" });
  return payload;
};

/**
 * Decode JWT and return payload.
 *
 * @param  {String} token
 * @return {Object}
 */
const decodeJWT = (token) => {
  let publicKey = config.jwt.public;
  const payload = jwt.decode(token, publicKey, { algorithm: "RS256" });
  return payload;
};

module.exports = {
  generateJWT,
  verifyJWT,
  decodeJWT,
  generateJWTCustomTime,
};
