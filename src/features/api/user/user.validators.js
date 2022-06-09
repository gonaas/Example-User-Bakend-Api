const joi = require('joi').extend(require('@joi/date'));
const { validate } = require('express-validation');

const createUser = validate({
  body: joi
    .object({
      name: joi.string().required().max(150),
      surname: joi.string().max(150),
      dni: joi.string().required().max(15),
      email: joi.string().required().email().max(150),
      telephone: joi.string().required().max(15),
      address: joi.string().required().max(150),
      dateOfBirth: joi.date().required(),
      isTutorEmp: joi.boolean(),
      isTutor: joi.boolean(),
      role: joi.string().required(),
      password: joi.string().required().min(6).max(15),
      companyUuid: joi.string(),
      currentClassUuid: joi.string(),
      centreUuid: joi.string(),
    })
    .unknown(false),
});

const updateUser = validate({
  body: joi
    .object({
      name: joi.string().max(150),
      surname: joi.string().max(150),
      dni: joi.string().max(15),
      email: joi.string().email().max(150),
      telephone: joi.string().max(15),
      address: joi.string().max(150),
      dateOfBirth: joi.date(),
      isTutorEmp: joi.boolean(),
      isTutor: joi.boolean(),
      role: joi.string(),
      password: joi.string().min(6).max(15),
      companyUuid: joi.string(),
      currentClassUuid: joi.string(),
      centreUuid: joi.string(),
    })
    .unknown(false),
});
module.exports = {
  createUser,
  updateUser,
};
