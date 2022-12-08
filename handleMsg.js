const { create, Client } = require("@open-wa/wa-automate");
const { Configuration, OpenAIApi } = require("openai");



const handleMsg = async (message, client = new Client()) => {
    const body = message.body
    const from = message.from


    const isCmd = body.startsWith('!')
    const command = body.trim().replace('!', '').split(/\s/).shift().toLowerCase()
    const helpMessage = `
                            ---COMMAND LIST---
                            !meme - untuk melihat meme
                            !tiktok (link tiktok) - untuk mendownload video tiktok
                        `

    if (isCmd) {
        let input = body
        let inputArray = input.split(" ")
        inputArray.shift()
        let arg1 = inputArray.join(" ")
        // client.simulateTyping(message.from, true)
        switch (command) {
            case 'help': {
                await client.sendText(from, helpMessage)
            }
            case 'openai': {
                let input = body
                let inputArray = input.split(" ")
                let text = ""

                if (inputArray.length == 1) {
                    text = "Perintah salah"
                } else {
                    inputArray.shift()
                    question = inputArray.join(" ")

                    try {
                        const configuration = new Configuration({
                            apiKey: "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",
                        });
                        const openai = new OpenAIApi(configuration);
                        const response = await openai.createCompletion({
                            model: "text-davinci-003",
                            prompt: question,
                            max_tokens: 255,
                        });

                        console.log(response.data.choices[0].text)

                        client.sendText(from, response.data.choices[0].text)
                    } catch (error) {
                        console.log(error)
                        text = error
                    }
                }

                console.log(`${from} has send ${body}`)
                await client.sendText(from, text)
                break
            }
        }
    }
}

module.exports = handleMsg