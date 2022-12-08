const { create, Client, ev } = require('@open-wa/wa-automate');
const handleMsg = require("./handleMsg");
const { Configuration, OpenAIApi } = require("openai");


// or
// import { create, Client } from '@open-wa/wa-automate';

function start(client) {
    client.onMessage(async (message) => {
        // const browser = await puppeteer.launch({ headless: true })
        handleMsg(message, client, Configuration, OpenAIApi).catch(err => {
            console.log(err)
        })
    });
}

create().then(start);
