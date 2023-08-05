const Joi = require("joi");
const emailRegexp = require("../utils/emailRegexp");

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "any.required": "Field 'name' is missing",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Field 'email' is missing",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Field 'password' is missing",
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Field 'email' is missing",
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Field 'email' is missing",
  }),
  password: Joi.string().min(6).required().messages({
    "any.required": "Field 'password' is missing",
  }),
});

const changeSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid("starter", "pro", "business")
    .default("starter")
    .messages({
      "any.only": "Subscription must be one of: starter, pro or business",
    }),
});

module.exports = {
  registerSchema,
  emailSchema,
  loginSchema,
  changeSubscriptionSchema,
};
