const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  changeSubscription,
  updateAvatar,
} = require("../../controllers/users");

const {
  registerSchema,
  loginSchema,
  changeSubscriptionSchema,
} = require("../../schemas/user"); //

const { validateBody, authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", validateBody(registerSchema), register);

router.post("/login", validateBody(loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/",
  authenticate,
  validateBody(changeSubscriptionSchema),
  changeSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
