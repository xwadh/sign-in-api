const log4js = require('log4js');

log4js.configure({
  appenders: {
    stdout: {//控制台输出
      type: 'stdout'
     },
     req: {//请求日志
      type: 'dateFile',
      filename: './log/request/',
      maxLogSize : 10,//文件最大存储空间，当文件内容超过文件存储空间会自动生成一个文件test.log.1的序列自增长的文件
      pattern: 'req-yyyy-MM-dd.log',
      alwaysIncludePattern: true
     },
    //  err: {//错误日志
    //   type: 'dateFile',
    //   filename: './log/errlog/',
    //   pattern: 'err-yyyy-MM-dd.log',
    //   alwaysIncludePattern: true
    //  },
    //  oth: {//其他日志
    //   type: 'dateFile',
    //   filename: './log/othlog/',
    //   pattern: 'oth-yyyy-MM-dd.log',
    //   alwaysIncludePattern: true
    //  }
  },
    categories: {
    default: { appenders: ['stdout', 'req'], level: 'debug' },//appenders:采用的appender,取appenders项,level:设置级别
    // err: { appenders: ['stdout', 'err'], level: 'error' },
    // oth: { appenders: ['stdout', 'oth'], level: 'info' }
    }
});

var logger = log4js.getLogger('*******项目启动********');
logger.info('*******start********');

module.exports = logger;