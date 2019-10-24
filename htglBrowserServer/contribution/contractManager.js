const co = require('co');
const common = require('../common/common');
const contractDao = require('../dao/contractDao');

function getContracts(userId, p, callback) {
    co(function*() {
        callback(0, {
            contracts: [
                {
                    htbh: '1',
                    xmmc: '项目1',
                    wtdw: '大众集团',
                    htfcsj: '2019-08-21',
                    htfhsj: '2019-08-28',
                    skjd: '未收款'
                },
                {
                    htbh: '2',
                    xmmc: '网约车项目',
                    wtdw: '北京不知名公司',
                    htfcsj: '2019-10-29',
                    htfhsj: '2019-11-08',
                    skjd: '未收款'
                },
                {
                    htbh: '3',
                    xmmc: '空间规划',
                    wtdw: '大众集团',
                    htfcsj: '2019-06-12',
                    htfhsj: '2019-08-25',
                    skjd: '已结账'
                },
                {
                    htbh: '4',
                    xmmc: '啊大顺发电房',
                    wtdw: '潜力控股',
                    htfcsj: '2018-08-21',
                    htfhsj: '2019-02-02',
                    skjd: '已结账'
                }
            ]
        });
    }).catch(function(err) {
        callback(err);
    });
}

function getContractContent(userId, p, callback) {
    co(function*() {
        let res = {
            data: {
                htbh: '1234',
                xmmc: '大数据采集'
            },
            struct: struct.base
        };
        if (p.role === 'input') res.struct = struct.input;
        if (p.role === 'worker') res.struct = struct.worker;
        callback(0, res);
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
    delContract
};

let struct = {
    base: [
        {
            id: 'cjdw',
            label: '承接单位',
            type: 'select',
            isHidden: true,
            isDisable: true,
            span: 6,
            items: [{ value: '吉利集团', label: '吉利集团' }, { value: '大众集团', label: '大众集团' }]
        },
        {
            id: 'htlx',
            label: '合同类型',
            type: 'select',
            span: 6,
            items: []
        },
        {
            id: 'htbh',
            label: '合同编号',
            type: 'input',
            span: 6
        }
    ],
    input: [],
    worker: []
};
