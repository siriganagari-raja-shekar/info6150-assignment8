const express = require("express");
const userController = require("./../controllers/userController");
const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.get("/getAll", userController.get);

usersRouter.post("/create", userController.create);

usersRouter.put("/edit", userController.update);

usersRouter.delete("/delete", userController.remove);

module.exports = usersRouter;