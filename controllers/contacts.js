const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const { addSchema, updateSchema } = require("../utils");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);

  if (!result) {
    return next(new HttpError(404));
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);

  // ---------
  //  Якщо в body немає якихось обов'язкових полів, повертає json з ключем {"message": "missing required name field"} і статусом 400
  if (error) {
    return next(new HttpError(400, "Missing required field"));
  }

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    return next(new HttpError(404));
  }
  res.json({ message: "Contact deleted" });
};

const updateContact = async (req, res, next) => {
  // Отримує body в json-форматі c оновленням будь-яких полів name, email и phone
  // Якщо body немає, повертає json з ключем { "message": "missing fields" } і статусом 400
  const fields = Object.keys(req.body);
  if (fields.length === 0) {
    return next(new HttpError(400, "Missing fields"));
  }

  // -------
  const { error } = updateSchema.validate(req.body);
  if (error) {
    return next(new HttpError(400, "Missing fields"));
  }

  // Отримує параметр id
  const { contactId } = req.params;
  // Якщо з body всі добре, викликає функцію updateContact(contactId, body).
  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    return next(new HttpError(404));
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
