// console.log(process.env.NODE_ENV === 'development')

let origin = ''
let staticOrigin = ''

if (process.env.NODE_ENV === 'development') { // 开发环境
  origin = '//47.106.98.124'
} else { // 编译环境
  // 测试环境
  if (process.env.type === 'test') {
    origin = '//120.76.188.39:8080'
  // 正式环境
  } else {
    origin = '//47.106.98.124'
  }
}

staticOrigin = origin + '/cjjjapi'

module.exports = {
  origin,
  staticOrigin
}
