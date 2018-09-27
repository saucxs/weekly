// default config
module.exports = {
    workers: 2,
    host: '127.0.0.1',
    port: '8362',
    redis: {
        host: '127.0.0.1',
        port: 6379,
        password: 'a123456',
        gcInterval: 10 * 60 * 1000
    }
};
