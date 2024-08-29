const express = require('express');
const router = express.Router();
const todoRoutes = require('./todos.routes');

router.use('/todos', todoRoutes);
//router.use(/users, userRoutes);

module.exports = router;