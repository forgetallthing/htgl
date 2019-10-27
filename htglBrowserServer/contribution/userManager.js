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
        let list = yield common.toPromise(userDao.getUserList, {})
        list.users = list.users || [];
        list.users = list.users.map((v) => {
            return {
                userName: v[0],
                role: v[2]
            }
        })
        callback(0, list);
    }).catch(function (err) {
        callback(err);
    });
}

function addUser(userId, p, callback) {
    co(function* () {
        let result = yield common.toPromise(userDao.addUser, { uname: p.userName, type: p.role })
        if (result.desc === "账号添加成功!") {
            callback(0, {
                msg: result.desc
            });
        } else {
            callback(result.desc);
        }
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
        let result = yield common.toPromise(userDao.delUser, { uname: p.userName, type: p.role })
        if (result.desc === "删除成功!") {
            callback(0, {
                msg: result.desc
            });
        } else {
            callback(result.desc);
        }
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