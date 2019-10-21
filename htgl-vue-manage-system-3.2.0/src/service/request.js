import axios from 'axios'
import qs from "qs";
import router from '../router/index';
import {
    MessageBox,
    Message
} from 'element-ui'
// import store from '@/store'
//import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 50000, // request timeout
    withCredentials: true, //cookie
})

// request interceptor
service.interceptors.request.use(
    config => {
        if (config.method === "get") {
            let p = JSON.stringify(config.params);
            config.params = {
                p: p
            }
        } else if (config.method === "post") {
            let p = JSON.stringify(config.data);
            config.data = qs.stringify({
                p: p
            })
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.state !== 1) {
            if (res.state === 3) {
                //未登录
                router.push({path: '/login'})
                //window.location.href = './#/login';
                Message({
                    message: res.value || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
            } else {
                Message({
                    message: res.value || 'Error',
                    type: 'error',
                    duration: 5 * 1000
                })
            }
            return Promise.reject(new Error(res.value || 'Error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
