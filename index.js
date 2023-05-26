import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { REST } from '@discordjs/rest';
import OrderCommand from './commands/order.js';

config();

const TOKEN = process.env.JER_BOT_TOKEN; // bot authentication for discord api
const CLIENT_ID = process.env.CLIENT_ID; // for calling to guild commands 
const GUILD_ID = process.env.GUILD_ID // parlance, guild = discord server, nowadays

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in!`));

client.on('interactionCreate', (interaction) => {
    if (interaction.isChatInputCommand()) {
        const userFood = interaction.options.get('food').value
        const userDrink = interaction.options.get('drink').value

        interaction.reply({ content: `Kublai Khan did decree: ${userFood} and ${userDrink}!` })
    }
});

async function main() {

    const commands = [OrderCommand];

    try {
        console.log('Started refreshing application (/) commands.')
        Routes.applicationCommand()
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
            body: commands,
        });
        client.login(TOKEN);
    } catch (err) {
        console.log(err);
    }
}

main();
