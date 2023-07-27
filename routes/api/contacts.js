const express = require("express");
const {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const {
  addSchema,
  updateSchema,
  updateFavoriteSchema,
} = require("../../schemas/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, getAll);

router.get("/:contactId", authenticate, isValidId, getContactById);

router.post("/", authenticate, validateBody(addSchema), addContact);

router.delete("/:contactId", authenticate, isValidId, removeContact);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(updateSchema),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
