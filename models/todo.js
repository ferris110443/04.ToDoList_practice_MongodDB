import mongoose from "mongoose";

const dbSchema = mongoose.Schema({
    todo:String
})


const todo = mongoose.model("todoList",dbSchema);


export default todo;

