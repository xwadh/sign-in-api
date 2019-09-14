const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

//待优化，第一次启动项目，将配置读取到缓存中，作为全局变量
const config = JSON.parse(
                fs.readFileSync(`${path.join(__dirname,'../')}/config/config.json`));

// /* 通过token获取JWT的payload部分 */
exports.getJWTPayload = function getJWTPayload(token) {
    // 验证并解析JWT
    console.log(config)
    return jwt.verify(token.split(' ')[1], config.token);
}

exports.setJWTPayload = function setJWTPayload(array){
    console.log(config)
    return jwt.sign({
        name  :  array[0],
        id    :  array[1]
    },
    config.token,
    { expiresIn: config.expiresIn },
    );
}


