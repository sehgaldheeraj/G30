const express = require('express');
const multer = require('multer');
const path = require('path');
const uploads = multer({dest: 'uploads/'});
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.post('/stats', uploads.single('uploaded_file'),(req, res)=>{
   const textData = req.body;
   const fileData = req.file; 
   res.json({message:'Your file was saved successfully'});
});
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})
app.listen(3000);

