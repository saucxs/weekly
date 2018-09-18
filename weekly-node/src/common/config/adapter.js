const redisCache = require('think-cache-redis');
const nunjucks = require('think-view-nunjucks');
const redisSession = require('think-session-redis');
const mysql = require('think-model-mysql');
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
    type: 'redis',
    common: {
        timeout: 24 * 60 * 60 * 1000 // millisecond
    },
    redis: {
        handle: redisCache,
        host: '127.0.0.1',
        port: 6379,
        password: 'a123456'
    }
};
// exports.cache = {
//   type: 'file',
//   common: {
//     timeout: 24 * 60 * 60 * 1000 // millisecond
//   },
//   file: {
//     handle: fileCache,
//     cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
//     pathDepth: 1,
//     gcInterval: 24 * 60 * 60 * 1000 // gc interval
//   }
// };

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: true,
    logSql: true,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    database: 'weekly',
    prefix: 'week_',
    encoding: 'utf8',
    host: '120.27.109.67',
    port: '3306',
    user: 'root',
    password: 'dxky500!',
    dateStrings: true
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
    type: 'redis',
    common: {
        cookie: {
            name: 'thinkjs',
            keys: ['werwer', 'werwer'],
            signed: true
        }
    },
    redis: {
        handle: redisSession,
        host: '127.0.0.1',
        port: 6379,
        password: 'a123456'
    }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
    type: 'nunjucks',
    common: {
        viewPath: path.join(think.ROOT_PATH, 'view'),
        sep: '_',
        extname: '.html'
    },
    nunjucks: {
        handle: nunjucks
    }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
    type: isDev ? 'console' : 'dateFile',
    console: {
        handle: Console
    },
    file: {
        handle: File,
        backups: 10, // max chunk number
        absolute: true,
        maxLogSize: 50 * 1024, // 50M
        filename: path.join(think.ROOT_PATH, 'logs/app.log')
    },
    dateFile: {
        handle: DateFile,
        level: 'ALL',
        absolute: true,
        pattern: '-yyyy-MM-dd',
        alwaysIncludePattern: true,
        filename: path.join(think.ROOT_PATH, 'logs/app.log')
    }
};
