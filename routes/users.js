const router = require('koa-router')()
const crypto = require("crypto");
const db = require('../tool/db');
let SALT_WORK_FACTOR = 10; //设置加密密码计算强度

router.prefix('/users')

//简单的用户名，密码注册
router.get('/register', async (ctx, next)=>{
  // let {username,password} = ctx.body;
  let {username,password} = ctx.query;
  db.User.create({
    username:username,
    password:password
  }).then(()=>{
    ctx.body = '注册成功';
  }).catch((err)=>{
    ctx.body = '';
  })
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router
