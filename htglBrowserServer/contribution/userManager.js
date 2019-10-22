const co = require("co");
const common = require("../common/common");
const userDao = require("../dao/userDao");
const cryptoJs = require("../public/common/crypto-js/crypto-js");

function userLogin(userId, p, callback) {
    co(function* () {
        let user = yield common.toPromise(userDao.getUserInfo, {
            userName: p,
            password: p
        });
        callback(0, {
            OK: "mgtLevel"
        });
    }).catch(function (err) {
        callback(err);
    });
}


function getUserList(userId, p, callback) {
    co(function* () {
        callback(0, {
            users: [{
                userName:"admin",
                role:"admin"
            },{
                userName:"Jackey",
                role:"normal"
            },{
                userName:"Rock",
                role:"normal"
            },]
        });
    }).catch(function (err) {
        callback(err);
    });
}

function addUser(userId, p, callback) {
    co(function* () {
        callback(0, {});
    }).catch(function (err) {
        callback(err);
    });
}

function resetPW(userId, p, callback) {
    co(function* () {
        callback(0, {});
    }).catch(function (err) {
        callback(err);
    });
}

function delUser(userId, p, callback) {
    co(function* () {
        callback(0, {});
    }).catch(function (err) {
        callback(err);
    });
}

module.exports = {
    userLogin,
    getUserList,
    addUser,
    resetPW,
    delUser,
};