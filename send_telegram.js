require('dotenv').config()
let XMLHttpRequest = require('xhr2');
let TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
let CHAT_ID = process.env.CHAT_ID
console.log(CHAT_ID)
console.log(TELEGRAM_TOKEN)


function send_tg_bot_message(message) {
    console.log("Sending message to Telegram");
    let xhr = new XMLHttpRequest();

    message = `${message}`;
    xhr.open("POST", `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=${message}`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
}
// send_tg_bot_message('hello')