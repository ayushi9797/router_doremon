const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");


const { connection } = require("./config/config")
const { UserModel } = require("./models/usermodel")
const { TodoModel } = require("./models/todomodel")
const { UserRouter } = require("./router/userrouter")
const{todoRouter} = require("./router/todorouter")
const { authenticate } = require("./middleware/authentication")


const app = express();
app.use(cors({origin:"*"}));

app.use(express.json());
app.use("/user", UserRouter);
app.use(authenticate);
app.use("/todo",todoRouter)



app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(` congratulations connected to database successfully ${process.env.port}`);
  } catch (err) {
    console.log({ error: "error in connecting" });
  }
});
