const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "any.required": "Field 'name' is missing",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Field 'email' is missing",
  }),
  phone: Joi.string().required().messages({
    "any.required": "Field 'phone' is missing",
  }),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().email(),
  phone: Joi.string(),
})
  .min(1)
  .messages({
    "object.min": "Missing fields",
  });

module.exports = { addSchema, updateSchema };
