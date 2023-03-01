

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

function parse_api_creds(api) {
    let data = {}

    switch (api) {
        case 'coin_market_cap':
            data = { key: apis[api][key] }
            break
    }

    return data
}

function apply_api_creds(creds, message=false) { // xhr as arg?
    // data = {}

    // if creds empty, return false
    if (Object.keys(creds).length === 0) return false

    switch (creds.name) {
        case 'coin_market_cap':
            xhr.setRequestHeader(creds.key.header, creds.key.val)
            break
        case 'telegram':
            if (message) {
                creds.url = creds.url + `&text=${message}`
            }
            break
    }

    return creds //return data
}
// apply_api_creds(apis['telegram'], message='hello')

function make_api_call(api, method, message=false) {
    let xhr = new XMLHttpRequest();
    
    let creds = apis[api] // let creds = parse_api_creds(api)
    console.log(creds)
    apply_api_creds(creds, message=message)
    
    // console.log(apply_api_creds(creds, message))

    console.log(creds.url)
    xhr.open(method, creds.url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log('sending request')
    console.log(xhr)
    xhr.send()
}
make_api_call('telegram', 'POST', message='hello!')


function send_tg_bot_message(message) {
    // console.log("Sending message to Telegram");
    let xhr = new XMLHttpRequest();

    message = `${message}`;
    xhr.open("POST", `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${TELEGRAM_ID}&text=${message}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}


// send_tg_bot_message('hello')