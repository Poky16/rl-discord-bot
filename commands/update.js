const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('update')
        .setDescription('MMR frissítése')
        .addIntegerOption(option =>
            option.setName('mmr')
                .setDescription('Add meg az MMR-ed')
                .setRequired(true)
        ),

    async execute(interaction) {

        const mmr = interaction.options.getInteger('mmr');
        const username = interaction.user.username;

        let data = {};

        if (fs.existsSync('data.json')) {
            data = JSON.parse(fs.readFileSync('data.json'));
        }

        data[username] = {
            mmr: mmr
        };

        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

const member = interaction.member;

let roleName = "";

if (mmr < 150) roleName = "Bronze 1";
else if (mmr < 250) roleName = "Bronze 2";
else if (mmr < 350) roleName = "Bronze 3";

else if (mmr < 450) roleName = "Silver 1";
else if (mmr < 550) roleName = "Silver 2";
else if (mmr < 650) roleName = "Silver 3";

else if (mmr < 750) roleName = "Gold 1";
else if (mmr < 850) roleName = "Gold 2";
else if (mmr < 950) roleName = "Gold 3";

else if (mmr < 1050) roleName = "Platinum 1";
else if (mmr < 1150) roleName = "Platinum 2";
else if (mmr < 1250) roleName = "Platinum 3";

else if (mmr < 1350) roleName = "Diamond 1";
else if (mmr < 1450) roleName = "Diamond 2";
else if (mmr < 1550) roleName = "Diamond 3";

else if (mmr < 1600) roleName = "Champion 1";
else if (mmr < 1650) roleName = "Champion 2";
else if (mmr < 1700) roleName = "Champion 3";

else if (mmr < 1750) roleName = "Grand Champion 1";
else if (mmr < 1800) roleName = "Grand Champion 2";
else if (mmr < 1850) roleName = "Grand Champion 3";

else roleName = "Supersonic Legend";

const ranks = [
"Bronze 1","Bronze 2","Bronze 3",
"Silver 1","Silver 2","Silver 3",
"Gold 1","Gold 2","Gold 3",
"Platinum 1","Platinum 2","Platinum 3",
"Diamond 1","Diamond 2","Diamond 3",
"Champion 1","Champion 2","Champion 3",
"Grand Champion 1","Grand Champion 2","Grand Champion 3",
"Supersonic Legend"
];

for (const rank of ranks) {
const role = interaction.guild.roles.cache.find(r => r.name === rank);
if (role && interaction.member.roles.cache.has(role.id)) {
await interaction.member.roles.remove(role);
}
}

const role = interaction.guild.roles.cache.find(r => r.name === roleName);

if (role) {
    await member.roles.add(role);
}


        await interaction.reply(`MMR frissítve: ${mmr}`);
    }
};