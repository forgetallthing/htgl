'use strict';

const common = require('../common/common');
const msg = require('../common/message');
const routerMap = {
    user: {
        // routerFile: require("./ncc"),`````````````
        manager: require('../contribution/userManager'),
        router: {
            test: {
                method: 'get'
            },
            userLogin: {},
            getUserList: {},
            addUser: {
                method: 'post'
            },
            resetPW: {
                method: 'post'
            },
            delUser: {
                method: 'post'
            },
            // removeTotalCheck: { arg: ["userId", "userLogin", "p"] },
            getKey: {
                method: 'post',
                ret: function (req, res, err, r) {
                    if (err) {
                        res.send(msg.buildErrMsg(err));
                    } else {
                        req.session.key = r.key;
                        res.send(msg.buildSuccessMsg(r));
                    }
                }
            }
        }
    },
    equipment: {
        manager: require('../contribution/equipmentManager'),
        router: {
            getEquipmentStatus: {},
            getLoginPageEquipmentStatus: {},
            getServiceList: {},
            restartService: {},
            getNetAdapterList: {},
            modifyAdapter: {},
            resetModelConf: {},
            resNet: {},
            getModelSet: {
                method: 'post'
            },
            saveModelSet: {
                method: 'post'
            }
        }
    },
    contract: {
        manager: require('../contribution/contractManager'),
        router: {
            getContracts: {},
            getContractContent: {},
            addContract: {
                method: 'post'
            },
            saveContract: {
                method: 'post'
            },
            delContract: {
                method: 'post'
            },
            exportExcel: {
                method: 'post'
            },
        }
    }
};

let routers = [];

for (let k in routerMap) {
    let routerSetting = routerMap[k];
    let router;
    if (routerSetting.routerFile) {
        router = routerSetting.routerFile;
    } else {
        const express = require('express');
        router = express.Router();
    }
    ((setting, r) => {
        for (let path in setting.router) {
            let rn = setting.router[path];
            if (!rn.manager) {
                rn.manager = setting.manager;
            }
            if (!rn.path) {
                rn.path = path;
            }
            if (!rn.method) {
                rn.method = 'get';
            }
            if (!rn.funcName) {
                rn.funcName = path;
            }
            if (!rn.arg) {
                rn.arg = ['userId', 'p'];
            }
            (rn => {
                r[rn.method]('/' + rn.path, function (req, res) {
                    if (!req.session) {
                        res.send(
                            msg.buildErrMsg({
                                message: '您没有登录~'
                            })
                        );
                        return;
                    }
                    let argVal = {
                        userId: req.session.userId,
                        userLogin: req.session.userLogin,
                        menuId: req.session.menuId
                    };
                    argVal.p = JSON.parse(req[rn.method == 'get' ? 'query' : 'body'].p);
                    argVal.puserid = common.clone(argVal.p);
                    argVal.puserid.userid = argVal.userId;
                    let arg = rn.arg.map(v => argVal[v]);
                    arg.push(
                        rn.ret
                            ? (err, r) => {
                                rn.ret(req, res, err, r);
                            }
                            : (err, r) => {
                                if (err) {
                                    res.send(msg.buildErrMsg(err));
                                } else {
                                    res.send(msg.buildSuccessMsg(r));
                                }
                            }
                    );
                    rn.manager[rn.funcName](...arg);
                });
            })(rn);
        }
    })(routerSetting, router);
    routers.push({
        path: k,
        r: router
    });
}

module.exports = routers;
