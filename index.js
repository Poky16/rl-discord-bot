require("dotenv").config();

const { Client, GatewayIntentBits, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
    }

}

client.once("ready", () => {

    console.log(Bot elindult: ${client.user.tag});

});

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {

        await command.execute(interaction);

    } catch (error) {

        console.error(error);

        await interaction.reply({
            content: "Hiba történt a parancs futtatásakor.",
            ephemeral: true
        });

    }

});

client.on("guildCreate", async guild => {

    const roles = [
        "Bronze",
        "Silver",
        "Gold",
        "Platinum",
        "Diamond",
        "Champion",
        "Grand Champion",
        "Supersonic Legend"
    ];

    for (const roleName of roles) {

        const existing = guild.roles.cache.find(r => r.name === roleName);

        if (!existing) {

            await guild.roles.create({
                name: roleName,
                color: "Random",
                reason: "RL Rank Bot role"
            });

        }

    }

    console.log(Rank roleok létrehozva: ${guild.name});

});

client.login(process.env.TOKEN);
