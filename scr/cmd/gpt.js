const axios = require('axios');

module.exports = {
  config: {
    name: "gpt",
    description: "hi",
    usage: "!gpt <your prompt>",
    cooldown: 5,
    accessableby: 0,
    category: "AI",
    prefix: true,
    author: "Churchill", 
  },

  start: async function (args) {
    const hot = args.hot;
    const pogi = args.pogi;
    const abing = args.abing;
    const nigg2ney = args.nigg2ney;

    let chill = pogi.join(" ");
    let uid = abing.senderID;

    let apiUrl = `https://markdevs-last-api-2epw.onrender.com/gpt4?prompt=${encodeURIComponent(chill)}&uid=${uid}`;

    try {
      let response = await axios.get(apiUrl);
      let gptResponse = response.data.gpt4;

      let formattedResponse = `${gptResponse}\n\nReply to this response to continue the conversation.`;
      nigg2ney(formattedResponse);

    } catch (error) {
      nigg2ney("There was an error fetching the GPT-4 response. Please try again later.");
      console.error(error);
    }
  },

  auto: async function (args) {
    const hot = args.hot;
    const abing = args.abing;
    const nigg2ney = args.nigg2ney;

    let chill = abing.body;
    let uid = abing.senderID;

    let apiUrl = `https://markdevs-last-api-2epw.onrender.com/gpt4?prompt=${encodeURIComponent(chill)}&uid=${uid}`;

    try {
      let response = await axios.get(apiUrl);
      let gptResponse = response.data.gpt4;

      let formattedResponse = `${gptResponse}\n\nReply to this response to continue the conversation.`;
      nigg2ney(formattedResponse);

    } catch (error) {
      nigg2ney("There was an error fetching the GPT-4 response. Please try again later.");
      console.error(error);
    }
  }
}