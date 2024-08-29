const express = require("express");

const PORT = 3000;
const app = express();
app.use(express.json());//application-level middleware
app.use(express.urlencoded({extended: true}));
app.get("/", (req, res)=>{
    res.send({"message" : "Hi"});
})
app.post("/", m1, (req, res)=>{
    const data = req.body;
    console.log(data);
    res.sendStatus(201);
})
function m1(req, res, next) {
    console.log("Hi from middleware one");
    next();
}
app.listen(PORT, ()=> {
    console.log("App started on port:", PORT);
})
