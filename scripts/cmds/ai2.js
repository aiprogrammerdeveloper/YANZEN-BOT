const axios = require('axios');

let lastResponseMessageID = null;

// Function to handle commands and process the AI response
async function handleCommand(api, event, args) {
    try {
        const question = args.join(" ").trim();

        if (!question) {
            return api.sendMessage("Please provide a question to get an answer.", event.threadID, event.messageID);
        }

        const { response, processingTime } = await getAIResponse(api, question, event.senderID);
        const formattedAnswer = formatResponse(response, processingTime);

        api.sendMessage(formattedAnswer, event.threadID, event.messageID);
    } catch (error) {
        console.error("Error in handleCommand:", error.message);
        api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
    }
}

// Function to fetch the answer from AI
async function getAnswerFromAI(api, question, senderID) {
    const uid = senderID;  // User UID to pass in API calls
    const services = [
        { url: 'https://markdevs-last-api.onrender.com/gpt4', params: { prompt: question, uid: uid } },
        { url: 'http://markdevs-last-api.onrender.com/api/v2/gpt4', params: { query: question, uid: uid } },
        { url: 'https://markdevs-last-api.onrender.com/api/v3/gpt4', params: { ask: question, uid: uid } },
        { url: 'https://www.samirxpikachu.run.place/gpt', params: { content: question, limit: 4, fullLimit: 3, uid: uid } },
        { url: 'https://www.samirxpikachu.run.place/ai-search', params: { q: question, uid: uid } },
        { url: 'https://www.samirxpikachu.run.place/bing', params: { message: question, mode: 'value', uid: uid } },
        { url: `https://sandipbaruwal.onrender.com/copilot`, params: { prompt: question, uid: uid } }
    ];

    for (const service of services) {
        const data = await fetchFromAI(service.url, service.params);
        if (data) return data;
    }

    throw new Error("No valid response from any AI service");
}

// Function to fetch data from the AI service
async function fetchFromAI(url, params) {
    try {
        const { data } = await axios.get(url, { params });
        const response = data.gpt4 || data.reply || data.response || data.answer || data.message;
        if (typeof response === 'string') {
            console.log("AI Response:", response);
            return response;
        }
        return null;
    } catch (error) {
        console.error("Error in fetchFromAI:", error.message);
        return null;
    }
}

// Main function to get the AI response with timing
async function getAIResponse(api, input, senderID) {
    const query = input.trim() || "hi";
    const startTime = Date.now();
    const response = await getAnswerFromAI(api, query, senderID);
    const processingTime = ((Date.now() - startTime) / 1000).toFixed(2) + " seconds";
    return { response, processingTime };
}

// Format the AI response with processing time (removed user name)
function formatResponse(response, processingTime) {
    return `👾senpAI👾\n\n╭━━━━━━━━━━━◆\n│....∘❀🌺 SHIZUKA 🌺❀∘....\n╰━━━━━━━━━━━◆\n\n${response}\n╰━━━━━━━━━━━━━━━◆\nProcessing time: ${processingTime}`;
}

module.exports = {
    config: {
        name: 'ai',
        author: 'coffee',
        role: 0,
        category: 'ai',
        shortDescription: 'AI to answer any question',
    },
    // Triggered when the command is invoked
    onStart: async function ({ api, event, args }) {
        await handleCommand(api, event, args);
    },
    // Handles incoming chat messages
    onChat: async function ({ api, event }) {
        const messageContent = event.body.trim().toLowerCase();

        // Command is triggered by any message that starts with "ai"
        if (messageContent.startsWith("ai") && event.senderID !== api.getCurrentUserID()) {
            const input = messageContent.replace(/^ai\s*/, "").trim();
            await handleCommand(api, event, [input]);
        }
    }
};
