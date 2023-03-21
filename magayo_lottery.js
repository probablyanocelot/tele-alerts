require('dotenv').config()
const XMLHttpRequest = require('xhr2');

const MAGAYO_TOKEN = process.env.MAGAYO_TOKEN

const games = {
    cash4life: 'us_cash4life',
    lottoamerica: 'us_lotto_america',
    luckyforlife: 'us_lucky_life',
    megamillions: 'us_mega_millions',
    powerball: 'us_powerball',
    doubleplay_powerball: 'us_powerball_double',
}


let url = 'https://www.magayo.com/api/'

function get_lotto_info(game) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        let  url_args = `results.php?api_key=${MAGAYO_TOKEN}&game=${game}`
        let request = url += url_args
        console.log()

        xhr.open('GET', request, true)

        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
                console.log(xhr.response)
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

        console.log(`sending GET request to MAGAYO LOTTO API`)
        console.log(xhr)
        xhr.send(request)

    })
}

get_lotto_info(games.powerball)