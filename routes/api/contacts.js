const express = require("express");

const router = express.Router();
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
const { validateBody, isValidId } = require("../../middlewares");

router.get("/", getAll);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(addSchema), addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, validateBody(updateSchema), updateContact);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
