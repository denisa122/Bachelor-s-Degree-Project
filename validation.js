const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(100).required(),
    lastName: Joi.string().min(2).max(100).required(),
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(8).required(),
    consentGiven: Joi.boolean().valid(true).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(100).required().email(),
    password: Joi.string().min(8).required(),
  });

  return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
