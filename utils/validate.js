
//----------JOI VALIDATOR TO VALIDATE USER INPUTS-----------------
const Joi = require("joi");

const validator = schema => payload => schema.validate(payload, { abortEarly: true });
const userValidation = Joi.object({
  name: Joi.string().alphanum().min(3).max(30)
    .required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'gh'] } })
    .required(),
  phoneNumber: Joi.string().regex(/^[0-9]{12}$/).messages({ 'string.pattern.base': `Phone number must have 12 digits` }).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),

})
exports.validateUser = validator(userValidation)




