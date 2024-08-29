const express = require('express');
const Tasks = require('../services/todos.services')
const router = express.Router();
const joi = require('joi');
const schema = joi.object({
    name: joi.string().required(),
    status: joi.string()
})
async function m1 (req, res, next){
    try{
        const data = req.body;
        const obj =await schema.validateAsync(data);
        if(obj){
            next();
        } 
    } catch (err) {
        res.status(404).send({message: err.message});
    }
    

}
router.post('/', m1 ,async (req, res, next)=>{
    // const data = req.body;
    // todos.push(data);
    // res.send(todos).status(201);
    try{
        const data = req.body;
        const todos = await Tasks.addTodo(data);
        res.send(todos);
    }catch(err){
        next(err);
    }
})

router.get('/', (req, res) => {
    const todoName = req.query.name;
    console.log(todoName);
    if(todoName){
        const todo = todos.find(t => t.name === todoName);
        res.send(todo);
    }else{
        res.send(todos);
    }
})

router.patch('/:name', (req, res)=>{
    const todoName = req.params.name;
    const {status} = req.body;
    const index = todos.findIndex(t => t.name === todoName);

    if(index === -1){
        res.send({message : "Todo does not exist"});
    }else{
        todos[index].status = status;
        res.send(todos);
    }

});

router.use((req, res) => {
    res.send('error aa gya!!');
})

module.exports = router;