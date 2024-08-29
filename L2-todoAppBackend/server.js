const express = require("express");
const app = express();

const routes = require('./routes');

const todos = [];

app.use(express.json()); //App-level-middleware
//BLOCKING VS NON BLOCKING CODE

//All CRUD Operations might take 1-2 seconds to exec
app.use('/v1', routes);


// app.post('/todos', (req, res)=>{
//     const data = req.body;
//     todos.push(data);
//     res.send(todos).status(201);
// })

// app.get('/todos', (req, res) => {
//     const todoName = req.query.name;
//     console.log(todoName);
//     if(todoName){
//         const todo = todos.find(t => t.name === todoName);
//         res.send(todo);
//     }else{
//         res.send(todos);
//     }
// })

// app.patch('/todos/:name', (req, res)=>{
//     const todoName = req.params.name;
//     const {status} = req.body;
//     const index = todos.findIndex(t => t.name === todoName);

//     if(index === -1){
//         res.send({message : "Todo does not exist"});
//     }else{
//         todos[index].status = status;
//         res.send(todos);
//     }

// })

/**
 * 1. Refactor Code - Routes, Middlewares, Controllers - Done
 * 2. JOI library - Important validation middleware - Done
 * 3. File System Module - Data Persistence - Done
 */

app.listen(4000, ()=>{
    console.log("app is running on port:", 4000);
});
