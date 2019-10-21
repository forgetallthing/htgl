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

//修改密码
export function changePW(query) {
  return request({
    url: config.url + '/login/changePW',
    method: 'post',
    data: query
  })
}

export function getUserList(query) {
  return request({
    url: config.url + '/user/getUserList',
    method: 'get',
    params: query
  })
}

export function addUser(query) {
  return request({
    url: config.url + '/user/addUser',
    method: 'post',
    data: query
  })
}

export function resetPW(query) {
  return request({
    url: config.url + '/user/resetPW',
    method: 'post',
    data: query
  })
}

export function delUser(query) {
  return request({
    url: config.url + '/user/delUser',
    method: 'post',
    data: query
  })
}