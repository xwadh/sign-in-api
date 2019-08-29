const Koa = require('koa')
const app = new Koa()
// const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koajwt = require('koa-jwt');
const logger = require('koa-logger')
const index = require('./routes/index')
const user = require('./routes/user')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())//自带koa-logger
// app.use(log4js.connectLogger(logger, {level: 'auto', format:':method :url'}));
app.use(require('koa-static')(__dirname + '/public'))

// 错误处理
app.use((ctx, next) => {
  return next().catch((err) => {
      if(err.status === 401){
          ctx.status = 401;
          ctx.body = 'Protected resource, use Authorization header to get access\n';
      }else{
          throw err;
      }
  })
})

app.use(koajwt({
  secret: 'token'
}).unless({
  path: [
      /\/user\/login/,
      '/user/register'
  ]
}));

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
