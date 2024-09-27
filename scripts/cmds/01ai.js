const axios = require('axios');

// Define the fonts mapping
const fonts = {
    a: "a", b: "b", c: "c", d: "d", e: "e", f: "f", g: "g", h: "h", i: "i",
    j: "j", k: "k", l: "l", m: "m", n: "n", o: "o", p: "p", q: "q", r: "r",
    s: "s", t: "t", u: "u", v: "v", w: "w", x: "x", y: "y", z: "z",
    A: "A", B: "B", C: "C", D: "D", E: "E", F: "F", G: "G", H: "H", I: "I",
    J: "J", K: "K", L: "L", M: "M", N: "N", O: "O", P: "P", Q: "Q", R: "R",
    S: "S", T: "T", U: "U", V: "V", W: "W", X: "X", Y: "Y", Z: "Z",
};

async function fetchFromAI(url, params) {
    try {
        const response = await axios.get(url, { params });
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getAIResponse(input, userId, messageID) {
    const services = [
        { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
        { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
        { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
        { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
    ];

    let response = "𝗕𝗼𝗻𝗷𝗼𝘂𝗿! 𝗝𝗲 𝘀𝘂𝗶𝘀 𝗹à 𝗽𝗼𝘂𝗿 𝗿é𝗽𝗼𝗻𝗱𝗿𝗲 à 𝘁𝗲𝘀 𝗾𝘂𝗲𝘀𝘁𝗶𝗼𝗻𝘀.";
    let currentIndex = 0;

    for (let i = 0; i < services.length; i++) {
        const service = services[currentIndex];
        const data = await fetchFromAI(service.url, service.params);
        if (data && (data.gpt4 || data.reply || data.response)) {
            response = data.gpt4 || data.reply || data.response;
            break;
        }
        currentIndex = (currentIndex + 1) % services.length; // Move to the next service in the cycle
    }

    // Convert response to special fonts
    const convertedResponse = Array.from(response)
        .map(char => fonts[char] || char) // Use special font or original character if not in fonts
        .join('');

    return { response: convertedResponse, messageID };
}

module.exports = {
    config: {
        name: 'ai',
        author: 'aesther',
        role: 0,
        category: 'Ai',
        shortDescription: 'ai to ask anything',
    },
    onStart: async function ({ api, event, args }) {
        const input = args.join(' ').trim();
        if (!input) {
            api.sendMessage(`✍️`, event.threadID, event.messageID);
            return;
        }

        const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
        api.sendMessage(`✰... SHIZUKA 𝐩𝐫𝐨𝐜𝐞̀𝐝𝐞 𝐚 𝐯𝐨𝐭𝐫𝐞 𝐫𝐞𝐪𝐮𝐞̂𝐭𝐞...✰`, event.threadID, messageID);
    },
    onChat: async function ({ event, message }) {
        const messageContent = event.body.trim().toLowerCase();
        if (messageContent.startsWith("-ai")) {
            const input = messageContent.replace(/^-ai\s*/, "").trim();
            const { response, messageID } = await getAIResponse(input, event.senderID, message.messageID);
            // Construct message with special fonts
            const formattedResponse = `${response}`;
            message.reply(formattedResponse, messageID);
        }
    }
};
