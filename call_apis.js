

require('dotenv').config()
let XMLHttpRequest = require('xhr2');
let TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
let TELEGRAM_ID = process.env.TELEGRAM_ID
let COIN_MARKET_CAP_TOKEN = process.env.COIN_MARKET_CAP_TOKEN

// ! ensure env keys working right
// console.log(TELEGRAM_ID)
// console.log(TELEGRAM_TOKEN)
// console.log(COIN_MARKET_CAP_TOKEN)

// ! api URLs
const url_coin_market_cap = 'https://pro-api.coinmarketcap.com'
const url_telegram = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_ID}&text=`

// ! api master dict
const apis = {
    coin_market_cap: {
        name: 'coin_market_cap',
        url: url_coin_market_cap,
        key: {
            type: 'header',
            header: 'X-CMC_PRO_API_KEY',
            val: COIN_MARKET_CAP_TOKEN
        }
    },
    telegram: {
        name: 'telegram',
        url: url_telegram,
    }
} 


function apply_api_params(params, message=false) { // xhr as arg?

    // if params empty, return false
    if (Object.keys(params).length === 0) return false

    // determine operations by name of api
    switch (params.name) {
        case 'coin_market_cap':
            xhr.setRequestHeader(params.key.header, params.key.val)
            break
        case 'telegram':
            if (message) params.url = params.url + message
            break
    }

    return params
}
// apply_api_params(apis['telegram'], message='hello')

function make_api_call(api, method, message=false) {
    let xhr = new XMLHttpRequest();
    
    let params = apis[api]

    // apply api-specific parameters to the call
    apply_api_params(params, message=message)

    xhr.open(method, params.url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(`sending ${method} request to ${api}`)
    xhr.send()
}
make_api_call('telegram', 'POST', message='hello!')




// send_tg_bot_message('hello')