import { config } from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const TOKEN = process.env.JER_BOT_TOKEN; // bot authentication for discord api

client.login(TOKEN);

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in!`) 
});

client.on('messageCreate', (message) => {
    console.log(message.content);
    console.log(message.createdAt.toDateString());
    console.log(message.author.tag);
});

client.on('channelPinsUpdate', (channel, date) => {
    
})
