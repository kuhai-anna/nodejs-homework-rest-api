const handleMongooseError = (error, data, next) => {
  const { name, code } = error;
  // Перевірка на дубль унікальних полів і зміна статусу відповідно помилки
  const status = name === "MongoServerError" && code === 11000 ? 409 : 400;

  error.status = status;
  next();
};

module.exports = handleMongooseError;
