let make_api_call = require('./call_apis.js');

function price_conversion(from_currency, to_currency) {
    let conversion_endpoint = '/v1/tools/price-conversion'

    let request_parameters = {
        'amount': '1',
        'symbol': from_currency,
        'convert': to_currency
    }
    make_api_call('coin_market_cap', 'GET', msg_or_endpoint = conversion_endpoint, url_args = request_parameters)
        .then(response => {

            let json_response = JSON.parse(response)
            let price = json_response['data']['quote'][to_currency]['price']

            let goal_price = 0.00001

            let message = `${from_currency} has reached ${price} ${to_currency}`
            if (price >= goal_price) make_api_call('telegram', 'POST', msg_or_endpoint = message)
        })
        .catch(err => console.log(err))
}


function alert_shib() {
    price_conversion('SHIB', 'USD')
    setTimeout(alert_shib, 10000)
}

alert_shib()