const mongoose = require('mongoose')
const userSchema = require('../shcemas/user')

module.exports = mongoose.model('User', userSchema)
