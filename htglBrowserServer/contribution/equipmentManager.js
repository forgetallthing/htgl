const co = require("co");
const common = require("../common/common");
const equipmentDao = require("../dao/equipmentDao");

//获取登录页的设备状态
function getLoginPageEquipmentStatus(userId, p, callback) {
    co(function* () {
        let equipmentData = yield common.toPromise(equipmentDao.getEquipmentStatus, {})
        let data = {
            systemTime: equipmentData.systime,
            gnssTime: equipmentData.gnsstime,
            systemStatus: equipmentData.sysstaue,
            satelliteStatus: equipmentData.plantstatus,
            timingNumber: equipmentData.numbertime,
            clientIP: equipmentData.cip || "",
        }
        // let data = yield common.toPromise(equipmentDao.getEquipmentStatus, data1);
        callback(0, data);
    }).catch(function (err) {
        callback(err);
    });
}

//获取设备状态页的设备状态
function getEquipmentStatus(userId, p, callback) {
    co(function* () {
        let equipmentData = yield common.toPromise(equipmentDao.getEquipmentStatus, {})
        let data = {
            systemTime: equipmentData.systime,
            gnssTime: equipmentData.gnsstime,
            systemStatus: equipmentData.sysstaue,
            satelliteStatus: equipmentData.plantstatus,
            timingNumber: equipmentData.numbertime,
            systemTemperature: equipmentData.systemp,
            version: equipmentData.version,
        }
        callback(0, data);
    }).catch(function (err) {
        callback(err);
    });
}

//获取系统控制页的服务列表
function getServiceList(userId, p, callback) {
    co(function* () {
        let serviceData = yield common.toPromise(equipmentDao.getSystrolTime, {})
        if (serviceData) {
            callback(0, serviceData);
        } else {
            callback(serviceData.desc);
        }
    }).catch(function (err) {
        callback(err);
    });
}

//重启服务
function restartService(userId, p, callback) {
    co(function* () {
        let systrolData = yield common.toPromise(equipmentDao.systrol, p)
        if (systrolData.id == "0") {
            callback(0, {
                id: systrolData,
            });
        } else {
            callback(systrolData.desc);
        }
    }).catch(function (err) {
        callback(err);
    });
}

//获取网络适配器设置
function getNetAdapterList(userId, p, callback) {
    co(function* () {
        let serviceData = yield common.toPromise(equipmentDao.getNet, {})
        callback(0, serviceData);
    }).catch(function (err) {
        callback(err);
    });
}

//修改适配器选项
function modifyAdapter(userId, p, callback) {
    co(function* () {
        let result = yield common.toPromise(equipmentDao.setNet, p)
        if (result.desc == "修改成功") {
            callback(0, {
                msg: "修改成功"
            });
        } else {
            callback(result.desc);
        }
    }).catch(function (err) {
        callback(err);
    });
}

//获取模式设置
function getModelSet(userId, p, callback) {
    co(function* () {
        let modelData = yield common.toPromise(equipmentDao.getModel, {})
        if (modelData.desc == "打开NPT.conf文件成功") {
            callback(0, {
                id: modelData.id,
                content: modelData.content,
                explain: ["配置项"],
            });
        } else {
            callback(modelData.desc);
        }
    }).catch(function (err) {
        callback(err);
    });
}

//修改模式设置
function saveModelSet(userId, p, callback) {
    co(function* () {
        let result = yield common.toPromise(equipmentDao.setModel, p)
        if (result.desc == "写入成功") {
            callback(0, {
                msg: "写入成功"
            });
        } else {
            callback(result.desc);
        }
    }).catch(function (err) {
        callback(err);
    });
}

//获取模式设置
function resetModelConf(userId, p, callback) {
    co(function* () {
        let resetconfResult = yield common.toPromise(equipmentDao.resetconf, {})
        if (resetconfResult.id == "0") {
            callback(0, resetconfResult.desc);
        } else {
            callback(resetconfResult.desc);
        }
    }).catch(function (err) {
        callback(err);
    });
}

//获取模式设置
function resNet(userId, p, callback) {
    co(function* () {
        let resNetResult = yield common.toPromise(equipmentDao.resNet, {})
        if (resNetResult.id == "0") {
            callback(0, resNetResult.desc);
        } else {
            callback(resNetResult.desc);
        }
    }).catch(function (err) {
        callback(err);
    });
}

module.exports = {
    getEquipmentStatus,
    getLoginPageEquipmentStatus,
    getServiceList,
    restartService,
    getNetAdapterList,
    modifyAdapter,
    getModelSet,
    saveModelSet,
    resetModelConf,
    resNet,
};