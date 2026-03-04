const { SlashCommandBuilder } = require('discord.js');

function getRankFromMMR(mmr) {

    if (mmr < 300) return "Bronze 🟤";
    if (mmr < 600) return "Silver ⚪";
    if (mmr < 900) return "Gold 🟡";
    if (mmr < 1100) return "Platinum 🟢";
    if (mmr < 1300) return "Diamond 🔵";
    if (mmr < 1500) return "Champion 🟥";
    if (mmr < 1700) return "Grand Champion 🟣";
    return "Supersonic Legend 🌟";
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Megmutatja milyen rang lenne az MMR alapján')
        .addIntegerOption(option =>
            option.setName('mmr')
                .setDescription('Add meg az MMR-t')
                .setRequired(true)
        ),

    async execute(interaction) {

        const mmr = interaction.options.getInteger('mmr');
        const rank = getRankFromMMR(mmr);

        await interaction.reply(**${mmr} MMR** → ${rank});
    }
};