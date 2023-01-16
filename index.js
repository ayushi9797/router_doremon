const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");


const { connection } = require("./config/config")
const { UserModel } = require("./models/usermodel")
const { PostModel } = require("./models/postschema")
const {UserRouter } = require("./router/userrouter")
const{PostRouter} = require("./router/postrouter")
const { authenticate } = require("./middleware/authentication")


const app = express();
app.use(cors({origin:"*"}));

app.use(express.json());
app.use("/users", UserRouter);
app.use(authenticate);
app.use("/post",PostRouter)



app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log(` congratulations connected to database successfully ${process.env.port}`);
  } catch (err) {
    console.log({ error: "error in connecting" });
  }
});
