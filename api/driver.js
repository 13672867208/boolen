import req from '../fetch/index.js'

const config = {
  findStoreById: {
    url: '/app/driver/findStoreById',
    method: 'post'
  }
}
const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
