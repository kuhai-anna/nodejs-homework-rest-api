const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const phoneRegexp =
  /^((\+?(38)[- ]?)|((38)?[- ]?))(\(0\d{2}\)|(0\d{2}))[- ]?\d{3}[- ]?\d{2}[- ]?\d{2}$/;

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      match: phoneRegexp,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().messages({
    "any.required": "Field 'name' is missing",
  }),
  email: Joi.string().email().required().messages({
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
  email: Joi.string().email(),
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

contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

const schemas = { addSchema, updateSchema, updateFavoriteSchema };

module.exports = { Contact, schemas };
