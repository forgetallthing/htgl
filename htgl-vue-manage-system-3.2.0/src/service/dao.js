import request from './request'
import {config} from './config'
console.log(config)

export function getKey(query) {
  return request({
    url: config.url + '/login/getKey',
    method: 'get',
    params: query
  })
}

export function login(query) {
  return request({
    url: config.url + '/login/login',
    method: 'post',
    data: query
  })
}

export function logout(query) {
  return request({
    url: config.url + '/login/logout',
    method: 'get',
    params: query
  })
}

export function getEquipmentStatus(query) {
  return request({
    url: config.url + '/equipment/getEquipmentStatus',
    method: 'get',
    params: query
  })
}

export function getLoginPageEquipmentStatus(query) {
  return request({
    url: config.url + '/equipment/getLoginPageEquipmentStatus',
    method: 'get',
    params: query
  })
}

export function getServiceList(query) {
  return request({
    url: config.url + '/equipment/getServiceList',
    method: 'get',
    params: query
  })
}

export function restartService(query) {
  return request({
    url: config.url + '/equipment/restartService',
    method: 'get',
    params: query
  })
}

export function getNetAdapterList(query) {
  return request({
    url: config.url + '/equipment/getNetAdapterList',
    method: 'get',
    params: query
  })
}

export function resNet(query) {
  return request({
    url: config.url + '/equipment/resNet',
    method: 'get',
    params: query
  })
}

export function modifyAdapter(query) {
  return request({
    url: config.url + '/equipment/modifyAdapter',
    method: 'get',
    params: query
  })
}

export function getModelSet(query) {
  return request({
    url: config.url + '/equipment/getModelSet',
    method: 'post',
    data: query
  })
}

export function saveModelSet(query) {
  return request({
    url: config.url + '/equipment/saveModelSet',
    method: 'post',
    data: query
  })
}

export function resetModelConf(query) {
  return request({
    url: config.url + '/equipment/resetModelConf',
    method: 'get',
    params: query
  })
}

//修改密码
export function changePW(query) {
  return request({
    url: config.url + '/login/changePW',
    method: 'post',
    data: query
  })
}