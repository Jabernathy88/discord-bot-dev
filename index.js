import { config } from 'dotenv';
import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

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
        const userContent = interaction.options.get('food').value
        // console.log(userContent)
        interaction.reply({ content: `Kublai Khan did decree ...${userContent}` })
    }
});

async function main() {
    const commands = [
        {
            name: 'kublai',
            description: 'quote the poem to user.',
            options: [
                {
                    name: 'food',
                    description: 'Your choice of food.',
                    type: 3,
                    required: true,
                }
            ]
        },
        // insert more as objects within this array
    ];

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
