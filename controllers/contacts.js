const Contact = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

// const getContactById = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await contacts.getContactById(contactId);

//   if (!result) {
//     return next(new HttpError(404));
//   }
//   res.json(result);
// };

// const addContact = async (req, res, next) => {
//   const result = await contacts.addContact(req.body);
//   res.status(201).json(result);
// };

// const removeContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await contacts.removeContact(contactId);

//   if (!result) {
//     return next(new HttpError(404));
//   }
//   res.json({ message: "Contact deleted" });
// };

// const updateContact = async (req, res, next) => {
//   const { contactId } = req.params;
//   const result = await contacts.updateContact(contactId, req.body);

//   if (!result) {
//     return next(new HttpError(404));
//   }
//   res.json(result);
// };

module.exports = {
  getAll: ctrlWrapper(getAll),
  // getContactById: ctrlWrapper(getContactById),
  // addContact: ctrlWrapper(addContact),
  // removeContact: ctrlWrapper(removeContact),
  // updateContact: ctrlWrapper(updateContact),
};
