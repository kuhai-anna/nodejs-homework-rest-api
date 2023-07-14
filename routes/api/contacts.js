const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts");
const { addSchema, updateSchema } = require("../../schemas/contacts");
const { validateBody } = require("../../middlewares");

router.get("/", ctrl.getAll);

// router.get("/:contactId", ctrl.getContactById);

// router.post("/", validateBody(addSchema), ctrl.addContact);

// router.delete("/:contactId", ctrl.removeContact);

// router.put("/:contactId", validateBody(updateSchema), ctrl.updateContact);

module.exports = router;
