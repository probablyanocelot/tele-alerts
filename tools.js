// takes object as params
const formatUrlParams = (params) => {
    return "?" + Object
          .keys(params)
          .map(function(key){
            return key+"="+encodeURIComponent(params[key])
          })
          .join("&")
}
  
const _formatUrlParams = formatUrlParams
module.exports = {
    fup: formatUrlParams,
}
