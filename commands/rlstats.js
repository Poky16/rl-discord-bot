const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rlstats')
    .setDescription('Rocket League stat lekérés')
    .addStringOption(option =>
      option.setName('platform')
        .setDescription('Platform (epic, steam, psn)')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('player')
        .setDescription('Játékos neve')
        .setRequired(true)),

  async execute(interaction) {

    const platform = interaction.options.getString('platform');
    const player = interaction.options.getString('player');

    try {

      const url = https://api.tracker.gg/api/v2/rocket-league/standard/profile/${platform}/${player};

      const res = await fetch(url);
      const data = await res.json();

      const stats = data.data.segments[0].stats;

      const wins = stats.wins.value;
      const goals = stats.goals.value;
      const assists = stats.assists.value;
      const saves = stats.saves.value;

      await interaction.reply(
        🎮 **${player} Rocket League Stats**\n\n +
        🏆 Wins: ${wins}\n +
        ⚽ Goals: ${goals}\n +
        🎯 Assists: ${assists}\n +
        🧤 Saves: ${saves}
      );

    } catch (err) {

      await interaction.reply('❌ Nem találtam ezt a játékost.');

    }

  },
};
