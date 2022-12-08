const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

async function start(){
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "cerita menarik soal virus komputer",
      max_tokens: 255,
    });

    console.log(response.data.choices[0].text)
}

start()