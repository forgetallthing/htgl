const co = require('co');
const common = require('../common/common');
const contractDao = require('../dao/contractDao');

function getContracts(userId, p, callback) {
    co(function*() {
        callback(0, {
            contracts: [
                {
                    col1: '02UJ23878',
                    col2: '安全性鉴定1'
                },
                {
                    col1: '02UJ23879',
                    col2: '安全性鉴定2'
                },
                {
                    col1: '02UJ23880',
                    col2: '安全性鉴定3'
                }
            ]
        });
    }).catch(function(err) {
        callback(err);
    });
}

function getContractContent(userId, p, callback) {
    co(function*() {
        callback(0, {});
    }).catch(function(err) {
        callback(err);
    });
}

function addContract(userId, p, callback) {
    co(function*() {
        callback(0, {});
    }).catch(function(err) {
        callback(err);
    });
}

function saveContract(userId, p, callback) {
    co(function*() {
        callback(0, {});
    }).catch(function(err) {
        callback(err);
    });
}

function delContract(userId, p, callback) {
    co(function*() {
        callback(0, {});
    }).catch(function(err) {
        callback(err);
    });
}

module.exports = {
    getContracts,
    getContractContent,
    addContract,
    saveContract,
    delContract,
};
