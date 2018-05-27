// console.log(process.env.NODE_ENV === 'development')

let origin = ''
let staticOrigin = ''

if (process.env.NODE_ENV === 'development') { // 开发环境
  origin = 'http://120.76.188.39:8080'
  staticOrigin = origin + '/cjjjapi'
} else { // 编译环境
  // 测试环境
  if (process.env.type === 'test') {
    origin = '//test.clothesapi.jingia.com/v1'
  // 正式环境
  } else {
    origin = 'http://120.76.188.39:8080'
    staticOrigin = origin + '/cjjjapi'
  }
}

module.exports = {
  origin,
  staticOrigin
}
