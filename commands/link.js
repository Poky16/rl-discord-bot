const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('link')
        .setDescription('Profil linkelése'),

    async execute(interaction) {
        await interaction.reply("Link parancs működik!");
    }
};