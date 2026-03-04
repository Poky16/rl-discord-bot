client.on("guildCreate", async (guild) => {

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

});
