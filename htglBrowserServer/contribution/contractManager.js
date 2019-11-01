const co = require('co');
const common = require('../common/common');
const config = require('../common/config');
const contractDao = require('../dao/contractDao');

function getContracts(userId, p, callback) {
    co(function*() {
        let list = yield common.toPromise(contractDao.getContracts, {});
        list.ht_list = list.ht_list || [];
        list.ht_list = list.ht_list.map(v => {
            return {
                htbh: v[3],
                xmmc: v[5],
                wtdw: v[8],
                htfcsj: v[4],
                htfhsj: v[7],
                skjd: v[40],
                xmkssj:v[11],
                xmjd:v[45],
                zybm:v[6],
            };
        });
        callback(0, {
            contracts: list.ht_list
        });
    }).catch(function(err) {
        callback(err);
    });
}

function getContractContent(userId, p, callback) {
    co(function*() {
        if (!p.htbh) {
            callback('未找到');
            return;
        }
        let list = yield common.toPromise(contractDao.getContractContent, { htbh: p.htbh });
        let turnData = list.ht_list.map(v => {
            return {
                id: v[0],
                cjdw: v[1],
                htlx: v[2],
                htbh: v[3],
                htfcsj: v[4],
                xmmc: v[5],
                zybm: v[6],
                htfhsj: v[7],
                wtdw: v[8],
                lxrjdh: v[9],
                ysje: v[10],
                xmkssj: v[11],
                yjwcsj: v[12],
                xmfzr: v[13],
                xmcy: v[14],
                wyzysj1: v[15],
                wyzynr1: v[16],
                wygzl1: v[17],
                wyzyry1: v[18],
                wyzysj2: v[19],
                wyzynr2: v[20],
                wygzl2: v[21],
                wyzyry2: v[22],
                wyzysj3: v[23],
                wyzynr3: v[24],
                wygzl3: v[25],
                wyzyry3: v[26],
                wyzysj4: v[27],
                wyzynr4: v[28],
                wygzl4: v[29],
                wyzyry4: v[30],
                nyzysj: v[31],
                nyzynr: v[32],
                nygzl: v[33],
                nyzyry: v[34],
                xmjsfs: v[35],
                jsje: v[36],
                gdsj: v[37],
                sfkp: v[38],
                fplx: v[39],
                skjd: v[40],
                sksj: v[41],
                skje: v[42],
                htgy: v[43],
                bz: v[44],
                xmjd:v[45]
            };
        });

        let res = {
            data: turnData[0],
            struct: struct.base
        };
        if (p.role === 'input') res.struct = struct.input;
        if (p.role === 'worker') res.struct = struct.worker;
        if (p.role === 'finance') res.struct = struct.cw;

        for (let i = 0; i < res.struct.length; i++) {
            if (res.struct[i].type == 'select' && res.struct[i].field != 'xmjd') {
                let ops = list[res.struct[i].field + '_selects'] || [];
                ops = ops.map(v => {
                    return {
                        value: v,
                        label: v
                    };
                });
                res.struct[i].options = ops;
            }
        }
        callback(0, res);
    }).catch(function(err) {
        callback(err);
    });
}

function addContract(userId, p, callback) {
    co(function*() {
        let result = yield common.toPromise(contractDao.addContract, { htbh: p.htbh });
        if (result.code == 1) {
            callback(0, {
                msg: result.desc
            });
        } else {
            callback(result.desc);
        }
    }).catch(function(err) {
        callback(err);
    });
}

function saveContract(userId, p, callback) {
    co(function*() {
        p.formData.wygzl1 = '';
        p.formData.wygzl2 = '';
        p.formData.wygzl3 = '';
        p.formData.wygzl4 = '';
        p.formData.nygzl = '';
        let result = yield common.toPromise(contractDao.saveContract, p.formData);
        if (result.code == 1) {
            callback(0, {
                msg: result.desc
            });
        } else {
            callback(result.desc);
        }
    }).catch(function(err) {
        callback(err);
    });
}

function delContract(userId, p, callback) {
    co(function*() {
        let result = yield common.toPromise(contractDao.delContract, { htbh: p.htbh });
        if (result.desc === '删除成功!') {
            callback(0, {
                msg: result.desc
            });
        } else {
            callback(result.desc);
        }
    }).catch(function(err) {
        callback(err);
    });
}

function exportExcel(userId, p, callback) {
    co(function*() {
        let result = yield common.toPromise(contractDao.exportExcel, { htbh: p.htbh });
        if (result.path) {
            callback(0, {
                path: config.api_url + result.path
            });
        } else {
            callback(result.desc);
        }
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
    exportExcel
};

let struct = {
    base: [
        {
            type: 'select',
            title: '承接单位',
            field: 'cjdw',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '合同类型',
            field: 'htlx',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'input',
            title: '合同编号',
            field: 'htbh',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
            }
        },
        {
            type: 'DatePicker',
            field: 'htfcsj',
            title: '合同发出时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '合同发出时间'
            }
        },
        {
            type: 'input',
            title: '项目名称',
            field: 'xmmc',
            value: '',
            col: {
                span: 12
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'select',
            title: '作业部门',
            field: 'zybm',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'DatePicker',
            field: 'htfhsj',
            title: '合同返回时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '合同返回时间'
            }
        },
        {
            type: 'select',
            title: '委托单位',
            field: 'wtdw',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '联系人及电话',
            field: 'lxrjdh',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'input',
            title: '预算金额',
            field: 'ysje',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'xmkssj',
            title: '项目开始时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '项目开始时间'
            }
        },
        {
            type: 'DatePicker',
            field: 'yjwcsj',
            title: '预计完成时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'select',
            title: '项目负责人',
            field: 'xmfzr',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '项目成员',
            field: 'xmcy',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj1',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr1',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry1',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj2',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr2',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry2',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj3',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr3',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry3',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj4',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr4',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry4',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'nyzysj',
            title: '内业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '内业作业内容及工作量',
            field: 'nyzynr',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'nyzyry',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'select',
            title: '项目进度',
            field: 'xmjd',
            value: '未开始',
            options: [
                {"value": "未开始", "label": "未开始"},
                {"value": "进行中", "label": "进行中"},
                {"value": "已完成", "label": "已完成"},
            ],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
            }
        },
        {
            type: 'select',
            title: '项目结算方式',
            field: 'xmjsfs',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'input',
            title: '结算金额',
            field: 'jsje',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'gdsj',
            title: '归档时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'select',
            title: '是否开票',
            field: 'sfkp',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '发票类型',
            field: 'fplx',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '收款进度',
            field: 'skjd',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'DatePicker',
            field: 'sksj',
            title: '收款时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '收款金额',
            field: 'skje',
            value: '',
            col: {
                span: 12
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '合同概要',
            field: 'htgy',
            value: '',
            col: {
                span: 24
            },
            props: {
                type: 'textarea'
            }
        },
        {
            type: 'input',
            title: '备注',
            field: 'bz',
            value: '',
            col: {
                span: 24
            },
            props: {
                type: 'textarea'
            }
        }
    ],
    input: [
        {
            type: 'select',
            title: '承接单位',
            field: 'cjdw',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true,
                disabled: false
            }
        },
        {
            type: 'select',
            title: '合同类型',
            field: 'htlx',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true,
                disabled: false
            }
        },
        {
            type: 'input',
            title: '合同编号',
            field: 'htbh',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
            }
        },
        {
            type: 'DatePicker',
            field: 'htfcsj',
            title: '合同发出时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '合同发出时间'
            }
        },
        {
            type: 'input',
            title: '项目名称',
            field: 'xmmc',
            value: '',
            col: {
                span: 12
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'select',
            title: '作业部门',
            field: 'zybm',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'DatePicker',
            field: 'htfhsj',
            title: '合同返回时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '合同返回时间'
            }
        },
        {
            type: 'select',
            title: '委托单位',
            field: 'wtdw',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '联系人及电话',
            field: 'lxrjdh',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'input',
            title: '预算金额',
            field: 'ysje',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'xmkssj',
            title: '项目开始时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '项目开始时间'
            }
        },
        {
            type: 'DatePicker',
            field: 'yjwcsj',
            title: '预计完成时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'select',
            title: '项目负责人',
            field: 'xmfzr',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '项目成员',
            field: 'xmcy',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj1',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr1',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry1',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj2',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr2',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry2',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj3',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr3',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry3',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj4',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr4',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry4',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'DatePicker',
            field: 'nyzysj',
            title: '内业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true
            }
        },
        {
            type: 'input',
            title: '内业作业内容及工作量',
            field: 'nyzynr',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'nyzyry',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'select',
            title: '项目进度',
            field: 'xmjd',
            value: '未开始',
            options: [
                {"value": "未开始", "label": "未开始"},
                {"value": "进行中", "label": "进行中"},
                {"value": "已完成", "label": "已完成"},
            ],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: true,
            }
        },
        {
            type: 'hidden',
            title: '项目结算方式',
            field: 'xmjsfs',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                disabled: true,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            title: '结算金额',
            field: 'jsje',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'DatePicker',
            field: 'gdsj',
            title: '归档时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'hidden',
            title: '是否开票',
            field: 'sfkp',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            title: '发票类型',
            field: 'fplx',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            title: '收款进度',
            field: 'skjd',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            field: 'sksj',
            title: '收款时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'hidden',
            title: '收款金额',
            field: 'skje',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '合同概要',
            field: 'htgy',
            value: '',
            col: {
                span: 24
            },
            props: {
                type: 'textarea'
            }
        },
        {
            type: 'input',
            title: '备注',
            field: 'bz',
            value: '',
            col: {
                span: 24
            },
            props: {
                type: 'textarea'
            }
        }
    ],
    worker: [
        {
            type: 'hidden',
            title: '承接单位',
            field: 'cjdw',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            title: '合同类型',
            field: 'htlx',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            title: '合同编号',
            field: 'htbh',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'hidden',
            field: 'htfcsj',
            title: '合同发出时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '合同发出时间'
            }
        },
        {
            type: 'input',
            title: '项目名称',
            field: 'xmmc',
            value: '',
            col: {
                span: 12
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'select',
            title: '作业部门',
            field: 'zybm',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                disabled: true,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            field: 'htfhsj',
            title: '合同返回时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '合同返回时间'
            }
        },
        {
            type: 'select',
            title: '委托单位',
            field: 'wtdw',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true,
                disabled: true,
            }
        },
        {
            type: 'select',
            title: '联系人及电话',
            field: 'lxrjdh',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true,
                disabled: true,
            }
        },
        {
            type: 'hidden',
            title: '预算金额',
            field: 'ysje',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'xmkssj',
            title: '项目开始时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '项目开始时间',
                disabled: true,
            }
        },
        {
            type: 'DatePicker',
            field: 'yjwcsj',
            title: '预计完成时间',
            value: '',
            col: {
                span: 12
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true,
            }
        },
        {
            type: 'select',
            title: '项目负责人',
            field: 'xmfzr',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true,
                disabled: true,
            }
        },
        {
            type: 'select',
            title: '项目成员',
            field: 'xmcy',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true,
                disabled: true,
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj1',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr1',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry1',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj2',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr2',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry2',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj3',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr3',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry3',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj4',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr4',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry4',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'nyzysj',
            title: '内业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '内业作业内容及工作量',
            field: 'nyzynr',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'nyzyry',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'select',
            title: '项目进度',
            field: 'xmjd',
            value: '未开始',
            options: [
                {"value": "未开始", "label": "未开始"},
                {"value": "进行中", "label": "进行中"},
                {"value": "已完成", "label": "已完成"},
            ],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
            }
        },
        {
            type: 'hidden',
            title: '项目结算方式',
            field: 'xmjsfs',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            title: '结算金额',
            field: 'jsje',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'hidden',
            field: 'gdsj',
            title: '归档时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'hidden',
            title: '是否开票',
            field: 'sfkp',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            title: '发票类型',
            field: 'fplx',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            title: '收款进度',
            field: 'skjd',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'hidden',
            field: 'sksj',
            title: '收款时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'hidden',
            title: '收款金额',
            field: 'skje',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'hidden',
            title: '合同概要',
            field: 'htgy',
            value: '',
            col: {
                span: 24
            },
            props: {
                type: 'textarea'
            }
        },
        {
            type: 'input',
            title: '备注',
            field: 'bz',
            value: '',
            col: {
                span: 24
            },
            props: {
                type: 'textarea',
                disabled: true,
            }
        }
    ],
    cw: [
        {
            type: 'select',
            title: '承接单位',
            field: 'cjdw',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '合同类型',
            field: 'htlx',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'input',
            title: '合同编号',
            field: 'htbh',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true
            }
        },
        {
            type: 'DatePicker',
            field: 'htfcsj',
            title: '合同发出时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '合同发出时间',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '项目名称',
            field: 'xmmc',
            value: '',
            col: {
                span: 12
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'select',
            title: '作业部门',
            field: 'zybm',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: false,
                allowCreate: true
            }
        },
        {
            type: 'DatePicker',
            field: 'htfhsj',
            title: '合同返回时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '合同返回时间',
                disabled: true,
            }
        },
        {
            type: 'select',
            title: '委托单位',
            field: 'wtdw',
            value: '',
            options: [],
            col: {
                span: 12
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '联系人及电话',
            field: 'lxrjdh',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'input',
            title: '预算金额',
            field: 'ysje',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'xmkssj',
            title: '项目开始时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '项目开始时间'
            }
        },
        {
            type: 'DatePicker',
            field: 'yjwcsj',
            title: '预计完成时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'select',
            title: '项目负责人',
            field: 'xmfzr',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '项目成员',
            field: 'xmcy',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj1',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr1',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry1',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj2',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr2',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry2',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj3',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr3',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry3',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'DatePicker',
            field: 'wyzysj4',
            title: '外业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '外业作业内容及工作量',
            field: 'wyzynr4',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'wyzyry4',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'DatePicker',
            field: 'nyzysj',
            title: '内业作业时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '内业作业内容及工作量',
            field: 'nyzynr',
            value: '',
            col: {
                span: 12,
                labelWidth: '155px',
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'input',
            title: '作业人员',
            field: 'nyzyry',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text',
                disabled: true,
            }
        },
        {
            type: 'select',
            title: '项目进度',
            field: 'xmjd',
            value: '未开始',
            options: [
                {"value": "未开始", "label": "未开始"},
                {"value": "进行中", "label": "进行中"},
                {"value": "已完成", "label": "已完成"},
            ],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                disabled: true,
            }
        },
        {
            type: 'select',
            title: '项目结算方式',
            field: 'xmjsfs',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'input',
            title: '结算金额',
            field: 'jsje',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'DatePicker',
            field: 'gdsj',
            title: '归档时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间',
                disabled: true,
            }
        },
        {
            type: 'select',
            title: '是否开票',
            field: 'sfkp',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '发票类型',
            field: 'fplx',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'select',
            title: '收款进度',
            field: 'skjd',
            value: '',
            options: [],
            col: {
                span: 6
            },
            props: {
                filterable: true,
                allowCreate: true
            }
        },
        {
            type: 'DatePicker',
            field: 'sksj',
            title: '收款时间',
            value: '',
            col: {
                span: 6
            },
            props: {
                type: 'date',
                format: 'yyyy-MM-dd',
                placeholder: '选择时间'
            }
        },
        {
            type: 'input',
            title: '收款金额',
            field: 'skje',
            value: '',
            col: {
                span: 12
            },
            props: {
                type: 'text'
            }
        },
        {
            type: 'input',
            title: '合同概要',
            field: 'htgy',
            value: '',
            col: {
                span: 24
            },
            props: {
                type: 'textarea'
            }
        },
        {
            type: 'input',
            title: '备注',
            field: 'bz',
            value: '',
            col: {
                span: 24
            },
            props: {
                type: 'textarea'
            }
        }
    ]
};
