const { getUser } = require("../utils/database");

module.exports = {

    name: "balance",
    aliases: ["bal", "wallet"],

    category: "Economy",

    description: "Shows your account balance.",

    usage: ".balance",

    example: ".balance",

    async execute(sock, msg) {

        const userId = msg.key.participant || msg.key.remoteJid;

        const user = getUser(userId);

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━━━━━━━━━━━━━━━━━━
┃ 💰 *ACCOUNT*
┣━━━━━━━━━━━━━━━━━━━━
┃
┃ 🪙 Coins : ${user.coins}
┃ 🏦 Bank  : ${user.bank}
┃ ⭐ Level : ${user.level}
┃ ✨ XP    : ${user.xp}
┃
┃ 🏆 Wins : ${user.wins}
┃ ❌ Loss : ${user.losses}
┃
╰━━━━━━━━━━━━━━━━━━━━`
        });

    }

};
