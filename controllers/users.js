const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../models/user");
const { HttpError, ctrlWrapper } = require("../helpers");

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  // Для повернення унікального сповіщення (message)
  const { email, password } = req.body;
  // Перевіряємо, чи є користувач з такою поштою у базі даних
  const user = await User.findOne({ email });
  // Якщо є, повертаємо помилку
  if (user) {
    return next(new HttpError(409, "Email already in use"));
  }

  // Засолюємо (хешуємо) пороль
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: newUser.email,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // Якщо немає зареєстрованого користувача, повертаємо помилку
  if (!user) {
    return next(new HttpError(401, "Email or password is wrong"));
  }
  // Порівнюємо пороль із запиту із засоленим поролем у базі
  const passwordCompare = await bcrypt.compare(password, user.password);
  // Якщо паролі не збігаються, повертаємо помилку
  if (!passwordCompare) {
    return next(new HttpError(401, "Email or password is wrong"));
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
    },
  });
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const changeSubscription = async (req, res, next) => {
  const { _id, email } = req.user;

  await User.findByIdAndUpdate(_id, req.body);

  res.status(200).json({
    email,
    ...req.body,
  });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  changeSubscription: ctrlWrapper(changeSubscription),
};
