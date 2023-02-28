// We can define all our routes here for improve code readability
const express = require('express');
const router = express.Router()
const userCtrl= require('../controllers/controllers')

router.get('/',userCtrl);
module.exports = router