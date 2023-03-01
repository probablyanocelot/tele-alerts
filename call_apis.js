

require('dotenv').config()
let XMLHttpRequest = require('xhr2');
let formatUrlParams = require('./tools.js').fup;
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


function make_api_call(api, method, msg_or_endpoint = false, url_args = false) {
    return new Promise(function (resolve, reject){
        let xhr = new XMLHttpRequest();

        let api_parameters = apis[api]

        // edit url, if needed
        if (msg_or_endpoint) api_parameters.url += msg_or_endpoint
        if (url_args) api_parameters.url += formatUrlParams(url_args)

        // open xhr request
        xhr.open(method, api_parameters.url, true);
        // apply api-specific parameters to the call
        switch (api_parameters.name) {
            case 'coin_market_cap':
                xhr.setRequestHeader(api_parameters.key.header, api_parameters.key.val)
                break
            case 'telegram':
                break
        }

        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        console.log(`sending ${method} request to ${api}`)
        xhr.send(url_args)
    })
}

// make_api_call('coin_market_cap', 'GET', msg_or_endpoint='/v1/cryptocurrency/listings/latest')
// make_api_call('telegram', 'POST', msg_or_endpoint = 'hello!')
//     .then(function (result) {
//         console.log(result);
//         logResultToTextBox(result)
//     })
//     .catch(function (err) {
//         console.error('Augh, there was an error!', err.statusText);
//     });

// send_tg_bot_message('hello')
module.exports = make_api_call