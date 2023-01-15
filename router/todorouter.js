const express = require("express");
const { authenticate } = require("../middleware/authentication");
const { TodoModel } = require("../models/todomodel")

const todoRouter = express.Router()



todoRouter.get("/", (req, res) => {
    res.send('WELCOME TODO')
})




//! ---------------- GET ---------------------------------------------------------------------------------------------



todoRouter.get("/todos", async (req, res) => {
    try {
        const user = await TodoModel.find();
        res.send(user);
        console.log(user);
    } catch (error) {
        res.send({ err: "something went wrong" });
    }
});




//! ----------------- POST ----------------------------------------------------------------------------------------



todoRouter.post("/create", async (req, res) => {
    const { taskname,status,tag, userID } = req.body;
    try {
        const data = new TodoModel({ taskname,status,tag, userID });
        await data.save();
        res.send({ "Message": "successfully created" });
    } catch (error) {
        console.log({ "error": error });
        console.log("Something went wrong");
    }
});





//! ------------------------ UPDTING ---------------------------------------------------------------------------



todoRouter.patch("/update/:todoID", async (req, res) => {
    const todoID = req.params.todoID
    const userID = req.body.userID
    const payload = req.body
    const todo = await TodoModel.findOne({ _id: todoID })
    try {
        if (userID !== todo.userID) {
            res.send("You are not Authorized for updating")
        } else {
            const data = await TodoModel.findByIdAndUpdate({ _id: todoID }, payload)
            res.send("Data Updated Successfully")
        }

    } catch (error) {
        console.log(Error)
        res.send("error in patch")
    }
})





//! ----------------- DELETING  ----------------------------------------------------------------------------------



todoRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const todo = await TodoModel.findOne({ "_id": id });
    const userID_in_todo = todo.userID;
    const userID_making_req = req.body.userID;

    try {
        if (userID_making_req != userID_in_todo) {
            res.status(401).send({message:'You are not authorized to delete the todo'})
        } else {
            await TodoModel.findByIdAndDelete({ "_id": id });
            res.send({message:'todo has been deleted'});
        }

    } catch (error) {
        console.log({ 'error': error });
        console.log('Something went wrong');
    }
})


//! --------------------------------  EXPORTING -------------------------------------------------------------------------





module.exports = {
    todoRouter
}