'use strict'

var koa = require('koa')
//日志中间件
var logger = require('koa-logger')
//会话中间件
var session = require('koa-session')
//解析post数据
var bodyParser = require('koa-bodyparser')
//生成服务器实例
var app = new koa()

//keys就是会话中间件里面，cookie session加密的key，这个key尽量设置的复杂一点
app.keys = ['imooc']
//在koa里面用中间件，非常简单，只要对use传入中间件就ok,use是logger()执行完之后return那个function
app.use(logger())
//session需要把我们当前的app传入
app.use(session(app))
app.use(bodyParser())

var router = require('./config/routes')()

app
  .use(router.routes())
  .use(router.allowedMethods())

//测试服务
// app.use(function *(next) {
//   console.log(this.href)
//   console.log(this.method)
//   this.body = {
//     success: true
//   }

//   yield next
// })

//app监听端口号
app.listen(1234)
console.log('Listening: 1234')