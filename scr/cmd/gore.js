const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
    config: {
        name: "gore",
        description: "Fetch a random gore video from the API",
        usage: "!gore",
        cooldown: 5,
        accessableby: 0,
        category: "Gore",
        prefix: true
    },
    start: async function ({ api, event, reply }) {
        try {
            const response = await axios.get("https://ggwp-ifzt.onrender.com/api/randgre");
            const data = response.data.result;

            // Construct the initial message with video details
            let message = `**${data.title}**\n\n`;
            message += `Source: ${data.source}\n`;
            message += `Tag: ${data.tag}\n`;
            message += `Upload Date: ${data.upload}\n`;
            message += `Author: ${data.author}\n`;
            message += `Views: ${data.view}\n`;
            message += `Votes: ${data.vote}\n`;
            message += `Comments: ${data.comment}\n`;

            await api.sendMessage({ body: message }, event.threadID);

            // Check which video URL is available
            const videoUrl = data.video1 || data.video2;
            if (!videoUrl) {
                return reply("No video available in the response.");
            }

            // Define the path to save the video with an .mp4 extension
            const videoPath = path.join(__dirname, 'randomvideogore.mp4');

            // Download the video and save it locally with the .mp4 extension
            const videoResponse = await axios({
                url: videoUrl,
                method: 'GET',
                responseType: 'stream'
            });

            // Pipe the video data to the file
            const writer = fs.createWriteStream(videoPath);
            videoResponse.data.pipe(writer);

            // Wait for the download to finish
            await new Promise((resolve, reject) => {
                writer.on('finish', resolve);
                writer.on('error', reject);
            });

            // Send the video as an attachment
            await api.sendMessage({
                body: 'Here is the video:',
                attachment: fs.createReadStream(videoPath)
            }, event.threadID);

            // Optional: Delete the video after sending
            fs.unlink(videoPath, (err) => {
                if (err) console.error("Failed to delete video:", err);
            });
            
        } catch (error) {
            console.error("Error fetching or sending video:", error);
            return reply("There was an error fetching the random gore video.");
        }
    }
};
