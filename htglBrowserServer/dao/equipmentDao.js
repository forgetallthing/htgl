"use strict";
const common = require("../common/common");
const config = require("../common/config");

//设备状态接口
function getEquipmentStatus(filter, callback) {
    common.service({
        url: config.api_url + '/devstatus/',
        method: 'get',
        params: {}
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}

//获取网络设置接口
function getNet(filter, callback) {
    common.service({
        url: config.api_url + '/getnet/',
        method: 'get',
        params: {}
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}

//网络设置接口
function setNet(filter, callback) {
    common.service({
        url: config.api_url + '/setnet/',
        method: 'post',
        data: filter
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}

//重启网络
function resNet(filter, callback) {
    common.service({
        url: config.api_url + '/resnet/',
        method: 'get',
        params: {}
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}

//获取模式接口
function getModel(filter, callback) {
    common.service({
        url: config.api_url + '/modelset/',
        method: 'get',
        params: {}
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}

//设置模式接口
function setModel(filter, callback) {
    common.service({
        url: config.api_url + '/modelset/',
        method: 'post',
        data: {
            content: filter.content,
        }
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}

//初始化模式接口
function resetconf(filter, callback) {
    common.service({
        url: config.api_url + '/resetconf/',
        method: 'get',
        params: {}
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}

//系统控制接口
function getSystrolTime(filter, callback) {
    common.service({
        url: config.api_url + '/alltime/',
        method: 'get',
        params: {}
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}

//系统控制接口
function systrol(filter, callback) {
    common.service({
        url: config.api_url + '/systrol/',
        method: 'post',
        data: {
            cid: filter.serviceId,
        }
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}

module.exports = {
    getEquipmentStatus,
    getNet,
    setNet,
    getModel,
    setModel,
    getSystrolTime,
    systrol,
    resetconf,
    resNet,
};