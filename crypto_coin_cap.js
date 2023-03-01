let make_api_call = require('./call_apis.js');

function price_conversion() {
    let conversion_endpoint = '/v1/tools/price-conversion'

    let request_parameters = {
        'amount': '1',
        'symbol': 'BTC',
        'convert': 'USD'
    }
    // console.log(formatUrlParams(request_parameters))
    make_api_call('coin_market_cap', 'GET', msg_or_endpoint=conversion_endpoint, url_args=request_parameters)
}

price_conversion()