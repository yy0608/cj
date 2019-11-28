// console.log(process.env.NODE_ENV === 'development')

let origin = ''
let originOrder = ''
let staticOrigin = ''

if (process.env.NODE_ENV === 'development') { // 开发环境
  origin = 'http://14.215.51.234:10003'
  originOrder = 'http://14.215.51.234:10003'
  // staticOrigin = origin + '/cjjjapi'
  staticOrigin = '//www.cjhome.vip/cjjjapi'
} else { // 编译环境
  // 测试环境
  if (process.env.type === 'test') {
    origin = 'http://14.215.51.234:10003'
    originOrder = 'http://14.215.51.234:10003'
  // 正式环境
  } else {
    origin = '//47.106.98.124'
    originOrder = 'http://www.cjhome.vip' // 预约项目单独的
  }
  staticOrigin = '//www.cjhome.vip/cjjjapi'
}

module.exports = {
  origin,
  originOrder,
  staticOrigin
}
