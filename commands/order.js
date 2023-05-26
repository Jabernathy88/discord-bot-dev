import { SlashCommandBuilder } from '@discordjs/builders';

const orderCommand = new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order your favorite meal!')
    .addStringOption((option) => option.setName('food').setDescription('Select your favorite food').setRequired(true).setChoices(
        {
            name: 'CAKE',
            value: 'cakes',
        },
        {
            name: 'STEAK',
            value: 'steaksss',
        },
        {
            name: 'Pizza',
            value: 'pizza',
        },
    ))
    .addStringOption((option) => option.setName('drink').setDescription('Select favorite drink').setRequired(true).setChoices(
        {
            name: 'Water',
            value: 'water',
        },
        {
            name: 'Soda',
            value: 'soda',
        },
        {
            name: 'Juice',
            value: 'juice',
        },
    )
);

export default orderCommand.toJSON();
