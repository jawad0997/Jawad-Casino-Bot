const fs = require("fs");
const path = require("path");

const commands = new Map();

const files = fs.readdirSync(path.join(__dirname, "..", "commands"));

for (const file of files) {
    if (!file.endsWith(".js")) continue;

    const command = require("../commands/" + file);

    commands.set(command.name, command);
}

module.exports = commands;
