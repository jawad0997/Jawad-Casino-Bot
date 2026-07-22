const config = require("../config");

module.exports = async (sock, msg) => {
    if (!msg.message) return;

    const text =
        msg.message.conversation ||
        msg.message.extendedTextMessage?.text;

    if (!text) return;

    const prefix = config.prefixes.find(p => text.startsWith(p));
    if (!prefix) return;

    const args = text.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        await sock.sendMessage(msg.key.remoteJid, {
            text: "🏓 Pong!"
        });
    }
};
