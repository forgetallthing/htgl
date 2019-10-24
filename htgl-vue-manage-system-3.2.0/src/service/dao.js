import request from './request';
import { config } from './config';

export function getKey(query) {
    return request({
        url: config.url + '/login/getKey',
        method: 'get',
        params: query
    });
}

export function login(query) {
    return request({
        url: config.url + '/login/login',
        method: 'post',
        data: query
    });
}

export function logout(query) {
    return request({
        url: config.url + '/login/logout',
        method: 'get',
        params: query
    });
}

//修改密码
export function changePW(query) {
    return request({
        url: config.url + '/login/changePW',
        method: 'post',
        data: query
    });
}

export function getUserList(query) {
    return request({
        url: config.url + '/user/getUserList',
        method: 'get',
        params: query
    });
}

export function addUser(query) {
    return request({
        url: config.url + '/user/addUser',
        method: 'post',
        data: query
    });
}

export function resetPW(query) {
    return request({
        url: config.url + '/user/resetPW',
        method: 'post',
        data: query
    });
}

export function delUser(query) {
    return request({
        url: config.url + '/user/delUser',
        method: 'post',
        data: query
    });
}

export function getContracts(query) {
    return request({
        url: config.url + '/contract/getContracts',
        method: 'get',
        params: query
    });
}

export function addContract(query) {
    return request({
        url: config.url + '/contract/addContract',
        method: 'post',
        data: query
    });
}

export function saveContract(query) {
    return request({
        url: config.url + '/contract/saveContract',
        method: 'post',
        data: query
    });
}

export function delContract(query) {
    return request({
        url: config.url + '/contract/delContract',
        method: 'post',
        data: query
    });
}

//获取form结构、已填写数据，参数为合同编号和用户角色
export function getContractContent(query) {
    return request({
        url: config.url + '/contract/getContractContent',
        method: 'get',
        params: query
    });
}