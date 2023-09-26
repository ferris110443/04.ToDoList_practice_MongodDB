import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import todo from "./models/todo.js"




const app = express();
const port = 3000;
// ========= middleware =============
app.use(express.static("public"));
app.set("view engine",'ejs');
app.set("views",'./views');
app.use(bodyParser.urlencoded({ extended: true }));

// ========= DB =============

const dbURL = "mongodb://0.0.0.0:27017/tododb";

mongoose.connect(dbURL);

// ========= CRUD =============
app.get("/",(req,res) => {
    todo.find({})
        .then(results => {
            console.log(results)
            res.render('index.ejs',{data:results})
        })    

})

app.post("/",(req,res) => {
    const newtodo = new todo({
        todo:req.body.inputBx
    })
    newtodo.save()
        .then(result =>{
            res.redirect('/')
        })

})

app.delete('/:_id',(req,res) => {
    todo.findByIdAndDelete(req.params._id)
        .then(result => {
            console.log('Todo item deleted successfully');
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Internal Server Error');
        });
    res.redirect("/")
})


app.listen(port,()=>{
    console.log(`listening on port : ${port}`)
})