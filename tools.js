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

// fs.writeFile('conversion.json', response, err => {
//     if (err) {
//       console.error(err);
//     }
//     // file written successfully
// });

// fs.readFile('conversion.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     // console.log(data);
//     let info = JSON.parse(data)
//     console.log(info['data'])
// });