const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: 'fbcover', 
        description: 'Generate a Facebook cover image using the Canvas API.', // Description of the command
        usage: 'fbcover <name> | <subname> | <sdt> | <address> | <email> | <color>', // Usage example
        cooldown: 5, 
        accessableby: 0, 
        category: 'Media', 
        prefix: false, 
    },
    start: async function({ api, text, event, reply }) {
        // Parse the input
        const args = text.join(' ').split('|').map(arg => arg.trim());
        if (args.length < 6) {
            return reply('Please provide all the necessary details: name | subname | sdt | address | email | color');
        }

        const [name, subname, sdt, address, email, color] = args;
        const uid = event.senderID; 

        
        const apiUrl = `https://ggwp-ifzt.onrender.com/canvas/fbcover?name=${encodeURIComponent(name)}&subname=${encodeURIComponent(subname)}&sdt=${encodeURIComponent(sdt)}&address=${encodeURIComponent(address)}&email=${encodeURIComponent(email)}&uid=${encodeURIComponent(uid)}&color=${encodeURIComponent(color)}`;

        
        const tempFilePath = path.join(__dirname, 'fbcover.jpg');

        try {
            
            const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
            fs.writeFileSync(tempFilePath, response.data);
          
        
            api.sendMessage({
                body: 'Here is your custom Facebook cover!',
                attachment: fs.createReadStream(tempFilePath)
            }, event.threadID, () => {
                
                fs.unlinkSync(tempFilePath);
            }, event.messageID);

        } catch (error) {
            console.error('Error:', error);
            return reply('An error occurred while generating the Facebook cover. Please try again later.');
        }
    }
};