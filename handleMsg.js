const { create, Client } = require("@open-wa/wa-automate");
const { Configuration, OpenAIApi } = require("openai");

const handleMsg = async (message, client = new Client()) => {
    const body = message.body;
    const from = message.from;

    const isCmd = body.startsWith("!");
    const command = body
        .trim()
        .replace("!", "")
        .split(/\s/)
        .shift()
        .toLowerCase();
    const helpMessage = ' ---COMMAND LIST---\n!ai - question and answer (openAI)\n!meme - untuk melihat meme';

    if (isCmd) {
        let input = body;
        let inputArray = input.split(" ")
        let text = "";

        // client.simulateTyping(message.from, true)
        switch (command) {
            case "help": {
                text = helpMessage

                console.log(`${from} has send ${body}`)
                await client.sendText(from, text)
                break
            }

            case "ai": {
                if (inputArray.length == 1) {
                    client.sendText(from, "perintah salah!");
                } else {
                    inputArray.shift()
                    const question = inputArray.join(" ")
                    try {
                        const configuration = new Configuration({
                            apiKey: process.env.KEY,
                        });
                        const openai = new OpenAIApi(configuration);
                        const response = await openai.createCompletion({
                            model: "text-davinci-003",
                            prompt: question,
                            max_tokens: 255,
                        });
                        text = response.data.choices[0].text

                    } catch (error) {
                        text = error
                    }
                }
                console.log(`${from} has send ${body}`)
                await client.sendText(from, text)
                break
            }

        }
    }
};

module.exports = handleMsg;
