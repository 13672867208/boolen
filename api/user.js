import req from '../fetch/index.js'

const config = {
  formlogin: {
    url: '/uaa/auth/form',
    method: 'post'
  },
  uploadImage: {
    url: '/app/uploadImage',
    method: 'post'
  },
  findInformationById: {
    url: '/app/login/findInformationById',
    method: 'post'
  },
  addCustomer: {
    url: '/app/customer/addCustomer',
    method: 'post'
  },
  findInformationByIdkehu: {
    url: '/webauth/login/findInformationById',
    method: 'post'
  },
  listSlideshows: {
    url: '/app/slideshow/listSlideshows',
    method: 'post'
  },
  listHotgoods: {
    url: '/app/hotgood/listHotgoods',
    method: 'post'
  },
  queryGoodClassify: {
    url: '/app/goodClassify/queryGoodClassify',
    method: 'post'
  },
  listGoods: {
    url: '/app/good/listGoods',
    method: 'post'
  },
  findGoodById: {
    url: '/app/good/findGoodById',
    method: 'post'
  },
  findGoodCommentById: {
    url: '/app/comment/findGoodCommentById',
    method: 'post'
  },
  addBuycar: {
    url: '/app/buycar/addBuycar',
    method: 'post'
  },
  listBuycars: {
    url: '/app/buycar/listBuycars',
    method: 'post'
  },
  updateBuycarById: {
    url: '/app/buycar/updateBuycarById',
    method: 'post'
  },
  deleteBuycar: {
    url: '/app/buycar/deleteBuycar',
    method: 'post'
  },
  addOrder: {
    url: '/app/order/addOrder',
    method: 'post'
  },
  listOrders: {
    url: '/app/order/listOrders',
    method: 'post'
  },
  findOrderById: {
    url: '/app/order/findOrderById',
    method: 'post'
  },
  actionOrderComment: {
    url: '/app/comment/actionOrderComment',
    method: 'post'
  },
  updatePasswordById: {
    url: '/app/customer/updatePasswordById',
    method: 'post'
  },
  updateStoreInviteById: {
    url: '/app/customer/updateStoreInviteById',
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
