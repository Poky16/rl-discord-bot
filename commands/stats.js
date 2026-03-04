const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stats')
        .setDescription('Statisztika megjelenítése'),

    async execute(interaction) {
        await interaction.reply("Stats parancs működik!");
    }
};