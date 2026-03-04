const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Top játékosok ranglistája'),

    async execute(interaction) {

        if (!fs.existsSync('data.json')) {
            return interaction.reply('Nincs még adat.');
        }

        const data = JSON.parse(fs.readFileSync('data.json'));

        const players = Object.entries(data);

        if (players.length === 0) {
            return interaction.reply('Nincs még játékos az adatbázisban.');
        }

        players.sort((a, b) => b[1].mmr - a[1].mmr);

        const top = players.slice(0, 10);

        const description = top
            .map((player, index) => 
                `**${index + 1}.** ${player[0]} — ${player[1].mmr} MMR`
            )
            .join('\n');

        const embed = new EmbedBuilder()
            .setTitle('🏆 RL Ranglista')
            .setColor(0x00AEFF)
            .setDescription(description)
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    }
};