const config = require("../config");
const commands = require("../utils/commandHandler");

module.exports = async (sock, msg) => {

    if (!msg.message) return;

    const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text;

    if (!text) return;

    const prefix = config.prefixes.find(p => text.startsWith(p));

    if (!prefix) return;

    const args = text.slice(prefix.length).trim().split(/ +/);

    const commandName = args.shift().toLowerCase();

    const command = commands.get(commandName);

    if (!command) return;

    command.execute(sock, msg, args);

};
