import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Todo from './models/Todo.js';

const app=express();

app.use(express.json()); //set content type to json
app.use(cors()); //avoid cross origin error

//connecting to the database by mongoose
mongoose.connect("mongodb+srv://javascript:javascript@cluster0.gihjsq1.mongodb.net/",{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=> console.log("Connected to the database succesfully"))
.catch((error)=> console.log(error))


//setting the routes
app.get('/todos', async (req,res)=>{
    const todos=await Todo.find();
    res.json(todos);
})


app.post('/todo/new',  (req,res)=>{
    const todo =new Todo({
        text:req.body.text
    })
    todo.save();
    res.json(todo);
})

app.delete('/todo/delete/:id',async(req,res)=>{
    const result=await Todo.findByIdAndDelete(req.params.id);
    res.json(result);
})

app.get('/todo/complete/:id',async (req,res)=>{
   const todo=await Todo.findById(req.params.id)
   todo.complete =!todo.complete;
   todo.save();
   res.json(todo);
})

app.listen(5000,()=>{
    console.log('Server listining at port 5000!');
})