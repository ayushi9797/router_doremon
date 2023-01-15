const mongoose = require("mongoose")

const todoSchema =  mongoose.Schema({
   
    taskname: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
      tag: {
        type: String,
        required: true,
      },
      userID:{
        type: String,
      }
      
        
      }
    );
   

const TodoModel = mongoose.model("todo",todoSchema)


module.exports={
    TodoModel
}

// {
//     "taskname":"study",
//     "status":"ayushi",
//      "tag":"me",
//        "userID":"ayushi"
    
// }