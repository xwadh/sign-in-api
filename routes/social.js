//社交路由
//用户登录时将用户好友列表拉取到缓存
const router = require('koa-router');
const db = require('../tool/db');

router.prefix('/social');

