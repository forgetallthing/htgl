'use strict';
const express = require('express');
const msg = require('../common/message');

const router = express.Router();

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const userDao = require('../dao/userDao');
// const validateCode = require("./cap");

router.post('/login', function(req, res) {
    try {
        var p = JSON.parse(req.body.p);
        console.log(req.session.key);
        const cryptoJs = require('../public/common/crypto-js/crypto-js');
        let v = cryptoJs.DES.decrypt(p.v, cryptoJs.enc.Utf8.parse(req.session.key), {
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        });
        v = v.toString(cryptoJs.enc.Utf8);
        p = JSON.parse(v);
        userDao.findUser(
            {
                login_name: p.loginName,
                // pwd: crypto.createHash("md5").update(p.pwd).digest("hex"),
                pwd: p.pwd
            },
            function(err, r) {
                if (err) {
                    res.send(msg.buildErrMsg(err));
                } else {
                    p.userId = p.loginName;
                    req.session.userId = p.loginName;
                    req.session.userLogin = p.loginName;
                    req.session.user = p;
                    res.send(
                        msg.buildSuccessMsg({
                            uid: p.loginName,
                            role: r.type
                        })
                    );
                }
            }
        );
    } catch (e) {
        res.send(msg.buildErrMsg(new Error('登录的key失效，请刷新页面重试。')));
    }
});

router.post('/changePW', function(req, res) {
    try {
        var p = JSON.parse(req.body.p);
        const cryptoJs = require('../public/common/crypto-js/crypto-js');
        let v = cryptoJs.DES.decrypt(p.v, cryptoJs.enc.Utf8.parse(req.session.pw_key), {
            mode: cryptoJs.mode.ECB,
            padding: cryptoJs.pad.Pkcs7
        });
        v = v.toString(cryptoJs.enc.Utf8);
        p = JSON.parse(v);
        userDao.findUser(
            {
                login_name: req.session.userLogin,
                // pwd: crypto.createHash("md5").update(p.pwd).digest("hex"),
                pwd: p.currentpass
            },
            function(err, r) {
                if (err) {
                    res.send(msg.buildErrMsg(err));
                } else {
                    userDao.changePW(
                        {
                            login_name: req.session.userId,
                            currentpass: p.currentpass,
                            pass1: p.pass1,
                            pass2: p.pass2
                        },
                        function(err, r) {
                            if (err) {
                                res.send(msg.buildErrMsg(err));
                            } else {
                                res.send(msg.buildSuccessMsg({}));
                            }
                        }
                    );
                }
            }
        );
    } catch (e) {
        res.send(msg.buildErrMsg(new Error('登录的key失效，请刷新页面重试。')));
    }
});

router.get('/getLoginName', function(req, res) {
    res.send(msg.buildSuccessMsg(req.session.userLogin));
});

//验证码
router.get('/addCode', function(req, res) {
    let p = Math.floor(Math.random() * validateCode.length);
    req.session.addcode = validateCode[p][0].toLowerCase();
    let spath = path.resolve(__dirname, './cap') + '/';
    fs.readFile(spath + validateCode[p][1], function(err, r) {
        if (err) {
            res.send(msg.buildErrMsg(err));
        } else {
            res.writeHead(200, {
                'Content-Type': 'image/png',
                'Content-Length': r.length
            });
            res.end(r);
        }
    });
});

router.get('/getKey', function(req, res) {
    let type = JSON.parse(req['query'].p).type;
    let key = '';
    for (let i = 0; i < 8; ++i) {
        key += String.fromCharCode(65 + Math.round(Math.random() * 26));
    }
    if (type === 'login') {
        if (req.session.userId) {
            res.send(msg.buildSuccessMsg('已登录'));
            return;
        } else {
            req.session.key = key;
        }
    } else if (type === 'changePW') {
        req.session.pw_key = key;
    }
    res.send(msg.buildSuccessMsg(key));
});

router.get('/logout', function(req, res) {
    //通过destroy()函数销毁session
    req.session.destroy(function(err) {
        console.log(err);
    });
    res.send(msg.buildSuccessMsg({}));
});

module.exports = router;
