const Joi = require("joi");
const emailRegexp = require("../utils/emailRegexp");
const phoneRegexp = require("../utils/phoneRegexp");

const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "any.required": "Field 'name' is missing",
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "any.required": "Field 'email' is missing",
  }),
  phone: Joi.string().required().pattern(phoneRegexp).messages({
    "any.required": "Field 'phone' is missing",
    "string.pattern.base":
      "Please enter a valid phone number. It must consist 10 digits and can begin with the code of Ukraine +380.",
  }),
  favorite: Joi.boolean(),
});

const updateSchema = Joi.object({
  name: Joi.string().min(2).max(30),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string().pattern(phoneRegexp).messages({
    "string.pattern.base":
      "Please enter a valid phone number. It must consist 10 digits and can begin with the code of Ukraine +380.",
  }),
})
  .min(1)
  .messages({
    "object.min": "Missing fields",
  });

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": "Missing field favorite",
  }),
});

module.exports = { addSchema, updateSchema, updateFavoriteSchema };
