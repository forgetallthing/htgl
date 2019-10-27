"use strict";
const common = require("../common/common");
const config = require("../common/config");

function getContracts(filter, callback) {
    common.service({
        url: config.api_url + '/gallhts/',
        method: 'get',
        params: {}
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
        callback(err)
    })
}


function addContract(filter, callback) {
    common.service({
        url: config.api_url + '/cht/',
        method: 'post',
        data: {
            htbh: filter.htbh,
        }
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
    })
}

function delContract(filter, callback) {
    common.service({
        url: config.api_url + '/dhtbynum/',
        method: 'post',
        data: {
            htbh: filter.htbh,
        }
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
    })
}

function getContractContent(filter, callback) {
    common.service({
        url: config.api_url + '/ghtbynum/',
        method: 'post',
        data: {
            htbh: filter.htbh,
        }
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
    })
}

function saveContract(filter, callback) {
    common.service({
        url: config.api_url + '/sht/',
        method: 'post',
        data: filter
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
    })
}

function exportExcel(filter, callback) {
    common.service({
        url: config.api_url + '/export/',
        method: 'post',
        data: {
            htbh: filter.htbh,
        }
    }).then((res) => {
        callback(0, res)
    }, (err) => {
        console.log(err)
    })
}

module.exports = {
    getContracts,
    addContract,
    delContract,
    getContractContent,
    saveContract,
    exportExcel,
};