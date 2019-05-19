const express = require('express')
const router = express.Router()

// const Category = require('../models/Category.js')
// const Content = require('../models/Content.js')

router.get('/', function (req, res, next) {
  res.json('很棒棒么')
})

module.exports = router
