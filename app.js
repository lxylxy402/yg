const express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyParser = require('body-parser')
// const User = re
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next()
})

app.use('/public', express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/', require('./routers/main'))
app.use('/user', require('./routers/user'))

mongoose.connect('mongodb://localhost:27017/config', function (err) {
  if (err) {
    console.log('数据库连接失败')
  } else {
    console.log('数据库连接成功')
    app.listen(8095)
  }
})