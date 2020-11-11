import req from '../fetch/index.js'

const config = {
  listDrivers: {
    url: '/app/store/listDrivers',
    method: 'post'
  },
  listOrders: {
    url: '/app/store/listOrders',
    method: 'post'
  },
  findOrderById: {
    url: '/app/store/findOrderById',
    method: 'post'
  },
  updateOrderState: {
    url: '/app/order/updateOrderState',
    method: 'post'
  }
}
const request = function (funcName, requestParam) {
  return req(config[funcName].url, config[funcName].method, requestParam, {}, config[funcName].fileConfig)
}
export default request
