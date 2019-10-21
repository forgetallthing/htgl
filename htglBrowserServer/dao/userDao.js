'use strict';
const common = require('../common/common');
const config = require('../common/config');

function findUser(filter, callback) {
    callback(0, {
        loginName: filter.loginName,
        role: 'admin'
    });
    // common.service({
    //     url: config.api_url + '/login/',
    //     method: 'post',
    //     data: {
    //         user: filter.login_name,
    //         pwd: filter.pwd,
    //     }
    // }).then((res) => {
    //     if (res.code == '0001') {
    //         callback(0, res)
    //     } else {
    //         callback(res.desc)
    //     }
    // }, (err) => {
    //     console.log(err)
    // })
}

//更改密码
function changePW(filter, callback) {
    common
        .service({
            url: config.api_url + '/alterpwd/',
            method: 'post',
            data: {
                user: filter.login_name,
                pwd1: filter.pass1,
                pwd2: filter.pass2
            }
        })
        .then(
            res => {
                if (res.code == '0002') {
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
    // if (filter.currentpass == user.password) {
    //     callback(null, {})
    // } else {
    //     callback("原密码不正确")
    // }
}

module.exports = {
    findUser,
    changePW
};
