const express = require("express");
require("express-async-errors");
const usersRouter = require("./src/routes/userRoutes");
const mongoose = require("mongoose");
const middleware = require("./src/middlewares/middleware");

const app = express();

const connectionString = `mongodb://localhost:27017/assignment8`;
mongoose.connect(connectionString)
    .then(()=>{
        console.log("Connected to database successfully");
    })
    .catch(()=>{
        console.log("There was a problem connecting to the database");
    })

app.use("/user",usersRouter);
app.use(middleware.undefinedRouteHandler);
app.use(middleware.errorMiddleware);

module.exports = app;