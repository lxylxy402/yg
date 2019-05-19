const express = require('express')
const router = express.Router()
const User = require('../models/User')
// 定义返回变量格式
let resData
router.use(function(req, res, next) {
  resData = {
    code: 0,
    message: ''
  }
  next()
})

router.post('/add', function (req, res, next) {
  let name = req.body.username
  let password = req.body.password
  if (name == '') {
    resData.code = 1
    resData.message = '用户名不能为空'
    res.json(resData)
    return
  }
  User.findOne({
    username: name
  }).then(function(userInfo) {
    if (userInfo) {
      console.log('这是userInfo')
      console.log(userInfo)
      resData.code = 4
      resData.message = '用户名已被注册'
      res.json(resData)
      return
    }
    let user = new User({
      username: name,
      password: password
    })
    return user.save()
  }).then(function(newuserInfo) {
    console.log('这是newuSERINOF')
    console.log(newuserInfo)
    resData.message = '添加成功'
    res.json(resData)
  })
})

router.post('/login', function(req, res, next) {
  let data = ''
  req.on('data', function (chunk) {
    // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
    data += chunk;
  })
  req.on('end', function () {
    // chunk 默认是一个二进制数据，和 data 拼接会自动 toString
    data = JSON.parse(data)
    console.log(data)
    let username = data.username
    let password = data.password
    console.log('data')
    console.log(data)
    console.log(req.body)
    console.log(req.params)
    console.log(username)
    console.log(password)
    if (username == '' || password == '') {
      resData.code = 1
      resData.message = '用户名或密码不能为空'
      res.json(resData)
      return
    }
    // User.find({}).then(function (user) {
    //   res.json(user)
    //   return
    // })
    User.findOne({
      username: "'lxy'",
      password: "'123'"
    }).then(function (userInfo) {
      if (!userInfo) {
        resData.code = 2
        resData.message = '用户名或者密码错误'
        res.json(resData)
        return
      }
      resData.message = '登录成功'
      res.json(resData)
      return
    })
  })
})

module.exports = router
