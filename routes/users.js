const router = require('koa-router')()
let bcrypt = require('bcrypt');
let cdypto = require('crypto');
const db = require('../tool/db');
const logger = require('../utils/log-config')
let SALT_WORK_FACTOR = 10; //设置加密密码计算强度

router.prefix('/users')

//简单的用户名，密码注册
router.get('/register', async (ctx, next)=>{
  // let {username,password} = ctx.body;
  let {username,password} = ctx.query;
  let salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  let hash = await bcrypt.hash(password,salt);
  await db.User.create({
    username:username,
    password:hash
  }).then(()=>{
    ctx.body = '注册成功';
    logger.info('注册成功:',username);
  }).catch((err)=>{
    ctx.body = '注册失败';
    logger.error('注册失败:',err);
  })
  // ctx.body = 'this is a users response!'
})

router.get('/login', async (ctx, next)=>{
  let {username,password} = ctx.request.body;
  let user = await db.User.findOne({
    where:{
      username:username
    }
  })
  if(!!user){
    //解密密码
    let bool = await bcrypt.compare(password,user.password);
    if(bool){
      let md5 = cdypto.createHash('md5');
      let token = md5.update(username,password).digest("hex");
      ctx.body = {code:200,data:{token:token,user:user.username},msg:'登录成功'};
    }else{
      ctx.body = {code:500,data:{},msg:'密码错误'};
    }
  }else{
    logger.info('用户登录失败',username);
    ctx.body = {code:500,data:{},msg:'没有该用户,请重新输入'};
  }
})

module.exports = router
