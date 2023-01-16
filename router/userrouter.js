const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
require('dotenv').config()
const jwt = require("jsonwebtoken");
const app = express();


const { UserModel } = require("../models/usermodel");
const UserRouter = express.Router();

app.use(express.json());

//!======================= GET ROUTER ====================================================================


UserRouter.get("/", (req, res) => {
    res.send("WELCOME TO ROUTER PAGE")
})


//! ======================= REGISTER USERS ================================================================


UserRouter.post('/register', (req, res) => {

    let { name, email, password } = req.body;
    console.log(req.body)

    try {
        bcrypt.hash(password, 5, async (error, secured_password) => {
            if (error) {
                res.send({  error:"error in registration" })
            } else {
                const data = new UserModel({ name, email, password: secured_password })
                await data.save()
                res.send(data)
                console.log(data)
            }
        })

    } catch (error) {
        res.send({ error:"error" })
    }

})


//! ================ LOGIN USER =========================================================================

UserRouter.post("/login", async(req,res)=>{
    const { email, password } = req.body;

  try {
    const user = await UserModel.find({ email });
    const hashed_pass = user[0].password;

    if (user.length > 0) {
      bcrypt.hash(password, hashed_pass, (err, result) => {
        console.log(result);
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "todo");
          res.send({ "msg": "login successfully", "token": token });
        } else {
          res.send("wrong cred");
        }
      });
    } else {
      res.send("wrong credentialss");
    }
  } catch (err) {
    console.log({ err: "err" });
    res.send({ "msg": "error crede in login" });
  }
  })
  

//! ******************

UserRouter.get("/about", (req, res) => {
    res.send("WELCOME  about router");
});



//! ============== GET DATA ============================

// UserRouter.get('/data', (req, res) => {
//     const token = req.headers.authorization;
//     console.log(token);

//     jwt.verify(token, "todo", (err, decoded) => {
//         if (err) {
//             res.send("invalid token");
//             console.log(err);
//         } else {
//             res.send("data");
//         }
//     });

//     console.log("WELCOME API data ");


// })



//! ======================= GET CART =======================


// UserRouter.get('/cart', (req, res) => {
//     const token = req.headers.authorization;
//     console.log(token);

//     jwt.verify(token, "todo", (err, decoded) => {
//         if (err) {
//             res.send("invalid token");
//             console.log(err);
//         } else {
//             res.send("cart page");
//         }
//     });

//     console.log("WELCOME  cart router");

// })

//! ======================= CONTACT ===========================================================================


UserRouter.get("/contact", (req, res) => {
    res.send("WELCOME contact router");
});




//! ========================= EXPORtING ================================================================================

module.exports = {
    UserRouter,
}