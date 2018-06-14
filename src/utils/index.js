export const getQueryString = name => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) {
    return unescape(r[2])
  } else {
    return null
  }
}

export const displayRealUrl = (prefix, url) => {
  if (/^http((:\/\/)|(s:\/\/))/.test(url)) {
    return url
  } else {
    return prefix + url
  }
}
