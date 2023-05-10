import { Client } from "discord.js";

const client = new Client({ intents: ['Guilds', 'GuildMessages'] });
const TOKEN = 'spacefiller'

client.login(TOKEN)
