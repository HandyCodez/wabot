const { create, Client, ev } = require('@open-wa/wa-automate');
const handleMsg = require("./handleMsg");
const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const app = express()
const port = 80


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

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
create({
    chromiumArgs: ['--no-sandbox', '--disable-setuid-sandbox']
}).then(start);
