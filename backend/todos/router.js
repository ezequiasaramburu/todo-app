const express = require('express');
const router = express.Router();
const ctl_orders = require('./ctl_todos.js');

router.get('/', ctl_orders.get);

router.post('/add', ctl_orders.create);

router.put('/update/:id', ctl_orders.update);

router.delete('/delete/:id', ctl_orders.delete);

module.exports = router;