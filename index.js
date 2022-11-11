const express = require("express");
require("express-async-errors");
const usersRouter = require("./usersRouter").usersRouter;
const mongoose = require("mongoose");
const middleware = require("./utils/middleware");

const app = express();

const connectionString = `mongodb://localhost:27017/assignment8`;

app.use("/user",usersRouter);
app.use(middleware.undefinedRouteHandler);
app.use(middleware.errorMiddleware);

app.listen(5000, async ()=>{
    await mongoose.connect(connectionString);
    console.log("Server started on port 5000");
});