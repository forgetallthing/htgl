'use strict';
const common = require('../common/common');
const config = require('../common/config');

function findUser(filter, callback) {
    common.service({
        url: config.api_url + '/login/',
        method: 'post',
        data: {
            user: filter.login_name,
            pwd: filter.pwd,
        }
    }).then((res) => {
        if (res.type) {
            callback(0, res)
        } else {
            callback(res.desc)
        }
    }, (err) => {
        console.log(err)
    })
}

//更改密码
function changePW(filter, callback) {
    common
        .service({
            url: config.api_url + '/alterpwd/',
            method: 'post',
            data: {
                user: filter.login_name,
                pwd1: filter.currentpass,
                pwd2: filter.pass2
            }
        })
        .then(
            res => {
                if (res.desc === "修改成功!") {
                    callback(0, res);
                } else {
                    callback(res.desc);
                }
            },
            err => {
                console.log(err);
                callback('服务器错误');
            }
        );
}

function getUserList(filter, callback) {
    common.service({
        url: config.api_url + '/gusers/',
        method: 'get',
        params: {}
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}

function addUser(filter, callback) {
    common.service({
        url: config.api_url + '/auser/',
        method: 'post',
        data: {
            uname: filter.uname,
            type: filter.type,
            desc: '',
        }
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
    })
}

function delUser(filter, callback) {
    common.service({
        url: config.api_url + '/duser/',
        method: 'post',
        data: {
            uname: filter.uname,
            type: filter.type,
            desc: '',
        }
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
    })
}



module.exports = {
    findUser,
    changePW,
    getUserList,
    addUser,
    delUser,
};
