const path = require('path');
const isDev = think.env === 'development';

module.exports = [
    {
        handle: 'meta',
        options: {
            logRequest: isDev,
            sendResponseTime: isDev
        }
    },
    {
        handle: 'resource',
        enable: isDev,
        options: {
            root: path.join(think.ROOT_PATH, 'www'),
            publicPath: /^\/(static|favicon\.ico)/
        }
    },
    {
        handle: 'trace',
        enable: !think.isCli,
        options: {
            debug: isDev,
            // contentType(ctx) {
            //     // All request url starts of /api or
            //     // request header contains `X-Requested-With: XMLHttpRequest` will output json error
            //   console.log(ctx.request.path,'22222222222222222222222222222')
            //     const APIRequest = /^\/weekly_node/.test(ctx.request.path);
            //     console.log(APIRequest, '333333333333333333333333')
            //     const AJAXRequest = ctx.is('X-Requested-With', 'XMLHttpRequest');
            //
            //     return APIRequest || AJAXRequest ? 'json' : 'html';
            // },
        }
    },
    {
        handle: 'payload',
        options: {}
    },
    {
        handle: 'router',
        options: {
          // prefix: ['/weekly_node/']
        }
    },
    'logic',
    'controller'
];
