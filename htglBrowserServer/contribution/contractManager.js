const co = require('co');
const common = require('../common/common');
const contractDao = require('../dao/contractDao');

function getContracts(userId, p, callback) {
    co(function* () {
        let list = yield common.toPromise(contractDao.getContracts, {})
        list.ht_list = list.ht_list || [];
        list.ht_list = list.ht_list.map((v) => {
            return {
                htbh: v[3],
                xmmc: v[5],
                wtdw: v[8],
                htfcsj: v[4],
                htfhsj: v[7],
                skjd: v[40]
            }
        })
        callback(0, {
            contracts: list.ht_list
        });
    }).catch(function (err) {
        callback(err);
    });
}

function getContractContent(userId, p, callback) {
    co(function* () {
        // let list = yield common.toPromise(contractDao.getContractContent, { htbh: p.htbh })
        let res = {
            data: {
                htbh: '1234',
                xmmc: '大数据采集',
                skje:'张旺是王八蛋'
            },
            struct: struct.base
        };
        if (p.role === 'input') res.struct = struct.input;
        if (p.role === 'worker') res.struct = struct.worker;
        callback(0, res);
    }).catch(function (err) {
        callback(err);
    });
}

function addContract(userId, p, callback) {
    co(function* () {
        let result = yield common.toPromise(contractDao.addContract, { htbh: p.htbh })
        if (result.desc === "账号添加成功!") {
            callback(0, {
                msg: result.desc
            });
        } else {
            callback(result.desc);
        }
    }).catch(function (err) {
        callback(err);
    });
}

function saveContract(userId, p, callback) {
    co(function* () {
        callback(0, {});
    }).catch(function (err) {
        callback(err);
    });
}

function delContract(userId, p, callback) {
    co(function* () {
        let result = yield common.toPromise(contractDao.delContract, { htbh: p.htbh })
        if (result.desc === "账号添加成功!") {
            callback(0, {
                msg: result.desc
            });
        } else {
            callback(result.desc);
        }
    }).catch(function (err) {
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
            type: "select",
            title: "承接单位",
            field: "cjdw",
            value: "123",
            options: [
                { "value": "生态蔬菜", "label": "生态蔬菜" },
                { "value": "新鲜水果", "label": "新鲜水果" },
            ],
            col: {
                span: 6,
            },
            props: {
                filterable: true,
                disabled: false,
            },
        }, {
            type: "select",
            title: "合同类型",
            field: "htlx",
            value: "",
            options: [
                { "value": "框架合同", "label": "框架合同" },
                { "value": "总价合同", "label": "总价合同" },
            ],
            col: {
                span: 6,
            },
            props: {
                filterable: true,
                disabled: false,
            },
        }, {
            type: "input",
            title: "合同编号",
            field: "htbh",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
                disabled: true,
            },
        }, {
            type: "DatePicker",
            field: "htfcsj",
            title: "合同发出时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "合同发出时间",
            }
        }, {
            type: "input",
            title: "项目名称",
            field: "xmmc",
            value: "",
            col: {
                span: 12,
            },
            props: {
                type: "text",
            },
        }, {
            type: "select",
            title: "作业部门",
            field: "zybm",
            value: "",
            options: [
                { "value": "工程测绘部", "label": "工程测绘部" },
                { "value": "不动产测绘部", "label": "不动产测绘部" },
                { "value": "工程+不动产测绘部", "label": "工程+不动产测绘部" },
                { "value": "其他", "label": "其他" },
            ],
            col: {
                span: 6,
            },
            props: {
                filterable: true,
                disabled: false,
            },
        }, {
            type: "DatePicker",
            field: "htfhsj",
            title: "合同返回时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "合同返回时间",
            }
        }, {
            type: "select",
            title: "委托单位",
            field: "wtdw",
            value: "",
            options: [
                { "value": "无", "label": "无" },
            ],
            col: {
                span: 12,
            },
            props: {
                filterable: true,
            },
        }, {
            type: "select",
            title: "联系人及电话",
            field: "lxrjdh",
            value: "",
            options: [
                { "value": "无", "label": "无" },
            ],
            col: {
                span: 6,
            },
            props: {
                filterable: true,
            },
        }, {
            type: "input",
            title: "预算金额",
            field: "ysje",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "DatePicker",
            field: "xmkssj",
            title: "项目开始时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "项目开始时间",
            }
        }, {
            type: "DatePicker",
            field: "yjwcsj",
            title: "预计完成时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "预计完成时间",
            }
        }, {
            type: "select",
            title: "项目负责人",
            field: "xmfzr",
            value: "",
            options: [
                { "value": "无", "label": "无" },
            ],
            col: {
                span: 6,
            },
            props: {
                filterable: true,
            },
        }, {
            type: "select",
            title: "项目成员",
            field: "xmcy",
            value: "",
            options: [
                { "value": "无", "label": "无" },
            ],
            col: {
                span: 6,
            },
            props: {
                filterable: true,
            },
        }, {
            type: "DatePicker",
            field: "wyzysj1",
            title: "外业作业时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "预计完成时间",
            }
        }, {
            type: "input",
            title: "外业作业内容",
            field: "wyzynr1",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "外业工作量",
            field: "wygzl1",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "作业人员",
            field: "wyzyry1",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "DatePicker",
            field: "wyzysj2",
            title: "外业作业时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "预计完成时间",
            }
        }, {
            type: "input",
            title: "外业作业内容",
            field: "wyzynr2",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "外业工作量",
            field: "wygzl2",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "作业人员",
            field: "wyzyry2",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "DatePicker",
            field: "wyzysj3",
            title: "外业作业时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "预计完成时间",
            }
        }, {
            type: "input",
            title: "外业作业内容",
            field: "wyzynr3",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "外业工作量",
            field: "wygzl3",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "作业人员",
            field: "wyzyry3",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "DatePicker",
            field: "wyzysj4",
            title: "外业作业时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "预计完成时间",
            }
        }, {
            type: "input",
            title: "外业作业内容",
            field: "wyzynr4",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "外业工作量",
            field: "wygzl4",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "作业人员",
            field: "wyzyry4",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "DatePicker",
            field: "nyzysj",
            title: "内业作业时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "预计完成时间",
            }
        }, {
            type: "input",
            title: "内业作业内容",
            field: "nyzynr",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "内业工作量",
            field: "nygzl",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "作业人员",
            field: "nyzyry",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "select",
            title: "项目结算方式",
            field: "xmjsfs",
            value: "",
            options: [
                { "value": "无", "label": "无" },
            ],
            col: {
                span: 12,
            },
            props: {
                filterable: true,
            },
        }, {
            type: "input",
            title: "结算金额",
            field: "jsje",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "DatePicker",
            field: "gdsj",
            title: "归档时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "预计完成时间",
            }
        }, {
            type: "select",
            title: "是否开票",
            field: "sfkp",
            value: "",
            options: [
                { "value": "无", "label": "无" },
            ],
            col: {
                span: 12,
            },
            props: {
                filterable: true,
            },
        }, {
            type: "select",
            title: "开票类型",
            field: "kplx",
            value: "",
            options: [
                { "value": "无", "label": "无" },
            ],
            col: {
                span: 12,
            },
            props: {
                filterable: true,
            },
        }, {
            type: "select",
            title: "收款进度",
            field: "skjd",
            value: "",
            options: [
                { "value": "无", "label": "无" },
            ],
            col: {
                span: 12,
            },
            props: {
                filterable: true,
            },
        }, {
            type: "DatePicker",
            field: "sksj",
            title: "收款时间",
            value: '',
            col: {
                span: 6,
            },
            props: {
                "type": "date",
                "format": "yyyy-MM-dd",
                "placeholder": "预计完成时间",
            }
        }, {
            type: "input",
            title: "收款金额",
            field: "skje",
            value: "",
            col: {
                span: 6,
            },
            props: {
                type: "text",
            },
        }, {
            type: "input",
            title: "合同概要",
            field: "htgy",
            value: "",
            col: {
                span: 24,
            },
            props: {
                type: "textarea",
            },
        }, {
            type: "input",
            title: "备注",
            field: "bz",
            value: "",
            col: {
                span: 24,
            },
            props: {
                type: "textarea",
            },
        }
    ],
    input: [{
        type: "select",
        title: "承接单位",
        field: "cjdw",
        value: "",
        options: [
            { "value": "生态蔬菜", "label": "生态蔬菜" },
            { "value": "新鲜水果", "label": "新鲜水果" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
            disabled: false,
        },
    }, {
        type: "select",
        title: "合同类型",
        field: "htlx",
        value: "",
        options: [
            { "value": "框架合同", "label": "框架合同" },
            { "value": "总价合同", "label": "总价合同" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
            disabled: false,
        },
    }, {
        type: "input",
        title: "合同编号",
        field: "htbh",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled: true,
        },
    }, {
        type: "DatePicker",
        field: "htfcsj",
        title: "合同发出时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "合同发出时间",
        }
    }, {
        type: "input",
        title: "项目名称",
        field: "xmmc",
        value: "",
        col: {
            span: 12,
        },
        props: {
            type: "text",
        },
    }, {
        type: "select",
        title: "作业部门",
        field: "zybm",
        value: "",
        options: [
            { "value": "工程测绘部", "label": "工程测绘部" },
            { "value": "不动产测绘部", "label": "不动产测绘部" },
            { "value": "工程+不动产测绘部", "label": "工程+不动产测绘部" },
            { "value": "其他", "label": "其他" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
            disabled: false,
        },
    }, {
        type: "DatePicker",
        field: "htfhsj",
        title: "合同返回时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "合同返回时间",
        }
    }, {
        type: "select",
        title: "委托单位",
        field: "wtdw",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 12,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "select",
        title: "联系人及电话",
        field: "lxrjdh",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "input",
        title: "预算金额",
        field: "ysje",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "DatePicker",
        field: "xmkssj",
        title: "项目开始时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "项目开始时间",
        }
    }, {
        type: "DatePicker",
        field: "yjwcsj",
        title: "预计完成时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "select",
        title: "项目负责人",
        field: "xmfzr",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
            disabled:true,
        },
    }, {
        type: "select",
        title: "项目成员",
        field: "xmcy",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
            disabled:true,
        },
    }, {
        type: "DatePicker",
        field: "wyzysj1",
        title: "外业作业时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
            disabled:true,
        }
    }, {
        type: "input",
        title: "外业作业内容",
        field: "wyzynr1",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "input",
        title: "外业工作量",
        field: "wygzl1",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "input",
        title: "作业人员",
        field: "wyzyry1",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "DatePicker",
        field: "wyzysj2",
        title: "外业作业时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
            disabled:true,
        }
    }, {
        type: "input",
        title: "外业作业内容",
        field: "wyzynr2",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "input",
        title: "外业工作量",
        field: "wygzl2",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "input",
        title: "作业人员",
        field: "wyzyry2",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "DatePicker",
        field: "wyzysj3",
        title: "外业作业时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
            disabled:true,
        }
    }, {
        type: "input",
        title: "外业作业内容",
        field: "wyzynr3",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "input",
        title: "外业工作量",
        field: "wygzl3",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "input",
        title: "作业人员",
        field: "wyzyry3",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "DatePicker",
        field: "wyzysj4",
        title: "外业作业时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
            disabled:true,
        }
    }, {
        type: "input",
        title: "外业作业内容",
        field: "wyzynr4",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "input",
        title: "外业工作量",
        field: "wygzl4",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "input",
        title: "作业人员",
        field: "wyzyry4",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "DatePicker",
        field: "nyzysj",
        title: "内业作业时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
            disabled:true,
        }
    }, {
        type: "input",
        title: "内业作业内容",
        field: "nyzynr",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "input",
        title: "内业工作量",
        field: "nygzl",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "input",
        title: "作业人员",
        field: "nyzyry",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "select",
        title: "项目结算方式",
        field: "xmjsfs",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 12,
        },
        props: {
            filterable: true,
            disabled:true,
        },
    }, {
        type: "input",
        title: "结算金额",
        field: "jsje",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled:true,
        },
    }, {
        type: "DatePicker",
        field: "gdsj",
        title: "归档时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "hidden",
        title: "是否开票",
        field: "sfkp",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 12,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "hidden",
        title: "开票类型",
        field: "kplx",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 12,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "hidden",
        title: "收款进度",
        field: "skjd",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 12,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "hidden",
        field: "sksj",
        title: "收款时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "hidden",
        title: "收款金额",
        field: "skje",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "合同概要",
        field: "htgy",
        value: "",
        col: {
            span: 24,
        },
        props: {
            type: "textarea",
        },
    }, {
        type: "input",
        title: "备注",
        field: "bz",
        value: "",
        col: {
            span: 24,
        },
        props: {
            type: "textarea",
        },
    }],
    worker: [{
        type: "hidden",
        title: "承接单位",
        field: "cjdw",
        value: "",
        options: [
            { "value": "生态蔬菜", "label": "生态蔬菜" },
            { "value": "新鲜水果", "label": "新鲜水果" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
            disabled: false,
        },
    }, {
        type: "hidden",
        title: "合同类型",
        field: "htlx",
        value: "",
        options: [
            { "value": "框架合同", "label": "框架合同" },
            { "value": "总价合同", "label": "总价合同" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
            disabled: false,
        },
    }, {
        type: "hidden",
        title: "合同编号",
        field: "htbh",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
            disabled: true,
        },
    }, {
        type: "hidden",
        field: "htfcsj",
        title: "合同发出时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "合同发出时间",
        }
    }, {
        type: "input",
        title: "项目名称",
        field: "xmmc",
        value: "",
        col: {
            span: 12,
        },
        props: {
            type: "text",
        },
    }, {
        type: "select",
        title: "作业部门",
        field: "zybm",
        value: "",
        options: [
            { "value": "工程测绘部", "label": "工程测绘部" },
            { "value": "不动产测绘部", "label": "不动产测绘部" },
            { "value": "工程+不动产测绘部", "label": "工程+不动产测绘部" },
            { "value": "其他", "label": "其他" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
            disabled: false,
        },
    }, {
        type: "DatePicker",
        field: "htfhsj",
        title: "合同返回时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "合同返回时间",
        }
    }, {
        type: "select",
        title: "委托单位",
        field: "wtdw",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 12,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "select",
        title: "联系人及电话",
        field: "lxrjdh",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "input",
        title: "预算金额",
        field: "ysje",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "DatePicker",
        field: "xmkssj",
        title: "项目开始时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "项目开始时间",
        }
    }, {
        type: "DatePicker",
        field: "yjwcsj",
        title: "预计完成时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "select",
        title: "项目负责人",
        field: "xmfzr",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "select",
        title: "项目成员",
        field: "xmcy",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 6,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "DatePicker",
        field: "wyzysj1",
        title: "外业作业时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "input",
        title: "外业作业内容",
        field: "wyzynr1",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "外业工作量",
        field: "wygzl1",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "作业人员",
        field: "wyzyry1",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "DatePicker",
        field: "wyzysj2",
        title: "外业作业时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "input",
        title: "外业作业内容",
        field: "wyzynr2",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "外业工作量",
        field: "wygzl2",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "作业人员",
        field: "wyzyry2",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "DatePicker",
        field: "wyzysj3",
        title: "外业作业时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "input",
        title: "外业作业内容",
        field: "wyzynr3",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "外业工作量",
        field: "wygzl3",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "作业人员",
        field: "wyzyry3",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "DatePicker",
        field: "wyzysj4",
        title: "外业作业时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "input",
        title: "外业作业内容",
        field: "wyzynr4",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "外业工作量",
        field: "wygzl4",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "作业人员",
        field: "wyzyry4",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "DatePicker",
        field: "nyzysj",
        title: "内业作业时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "input",
        title: "内业作业内容",
        field: "nyzynr",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "内业工作量",
        field: "nygzl",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "input",
        title: "作业人员",
        field: "nyzyry",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "hidden",
        title: "项目结算方式",
        field: "xmjsfs",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 12,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "hidden",
        title: "结算金额",
        field: "jsje",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "hidden",
        field: "gdsj",
        title: "归档时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "hidden",
        title: "是否开票",
        field: "sfkp",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 12,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "hidden",
        title: "开票类型",
        field: "kplx",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 12,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "hidden",
        title: "收款进度",
        field: "skjd",
        value: "",
        options: [
            { "value": "无", "label": "无" },
        ],
        col: {
            span: 12,
        },
        props: {
            filterable: true,
        },
    }, {
        type: "hidden",
        field: "sksj",
        title: "收款时间",
        value: '',
        col: {
            span: 6,
        },
        props: {
            "type": "date",
            "format": "yyyy-MM-dd",
            "placeholder": "预计完成时间",
        }
    }, {
        type: "hidden",
        title: "收款金额",
        field: "skje",
        value: "",
        col: {
            span: 6,
        },
        props: {
            type: "text",
        },
    }, {
        type: "hidden",
        title: "合同概要",
        field: "htgy",
        value: "",
        col: {
            span: 24,
        },
        props: {
            type: "textarea",
        },
    }, {
        type: "input",
        title: "备注",
        field: "bz",
        value: "",
        col: {
            span: 24,
        },
        props: {
            type: "textarea",
        },
    }]
};
