const fs = require("fs");
const path = require("path");

const commands = new Map();

const commandFiles = fs
    .readdirSync(path.join(__dirname, "..", "commands"))
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {

    const command = require(path.join(__dirname, "..", "commands", file));

    commands.set(command.name.toLowerCase(), command);

    if (Array.isArray(command.aliases)) {
        for (const alias of command.aliases) {
            commands.set(alias.toLowerCase(), command);
        }
    }

}

module.exports = commands;
