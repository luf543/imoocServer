'use strict'

var xss = require('xss')
var mongoose = require('mongoose')
var User = mongoose.model('User')
exports.signup = function *(next) {
  // var phoneNumber = this.request.body.phoneNumber
  var phoneNumber = this.query.phoneNumber

  var user = yield User.findOne({
    phoneNumber: phoneNumber
  }).exec() //调用.exec()方法就是一个promise

  if(!user){
    user = new User({
      phoneNumber: xss(phoneNumber)
    })
  }else{
    user.verifyCode = '1212'
  }

  try{
    user = yield user.save()
  }
  catch(e){
    console.log(e)
    this.body = {
      success: false
    }
    return
  }
  
  this.body = {
    success: true
  }
}

exports.verify = function *(next) {
  this.body = {
    success: true
  }
}

exports.update = function *(next) {
  this.body = {
    success: true
  }
}