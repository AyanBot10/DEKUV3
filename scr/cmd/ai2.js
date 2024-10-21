const axios = require('axios');

module.exports = {
    config: {
        name: 'ai2',
        description: 'Interact with the Hercai AI',
        usage: 'ai2 [question]',
        cooldown: 3,
        accessableby: 0, 
        category: 'AI',
        prefix: false,
    },
    start: async function({ api, event, text, reply }) {
        const question = text.join(' ');

        if (!question) {
            return reply('Please provide a question, for example: ai2 what is love?');
        }

        const initialMessage = await new Promise((resolve, reject) => {
            api.sendMessage({
                body: '🤖 Ai answering...',
                mentions: [{ tag: event.senderID, id: event.senderID }],
            }, event.threadID, (err, info) => {
                if (err) return reject(err);
                resolve(info);
            }, event.messageID);
        });

        try {
            const response = await axios.get('https://hercai.onrender.com/v3/hercai', {
                params: { question }
            });
            const aiResponse = response.data;
            const responseString = aiResponse.reply ? aiResponse.reply : 'No result found.';

            const formattedResponse = `
🤖 Hercai AI
━━━━━━━━━━━━━━━━━━
${responseString}
━━━━━━━━━━━━━━━━━━`;

            await api.editMessage(formattedResponse.trim(), initialMessage.messageID);

        } catch (error) {
            console.error('Error:', error);
            await api.editMessage('An error occurred, please try again later.', initialMessage.messageID);
        }
    },
    auto: async function({ api, event, text, reply }) {
        // Optional: Add auto-response logic here if needed
    }
};
