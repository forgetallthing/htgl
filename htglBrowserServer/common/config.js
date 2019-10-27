const Config = {
    sys_mongo: "127.0.0.1:27017",
    mongo_db: "main_htgl",
    log_db: "log_htgl",
    hasUser: false, //数据库是否需要用户登录
    DB_USER: "adminUser",
    DB_PW: "adminPass",
    errLog: "../app.err",
    api_url: "http://106.13.0.214:8000",
    // api_url: "http://127.0.0.1:8001",
};

module.exports = Config;