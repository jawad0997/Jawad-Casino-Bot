module.exports = {

    name: "menu",
    description: "Show bot menu",

    async execute(sock, msg) {

        const menu = `╭━━━━━━━━━━━━━━━━━━━━
┃ 🎰 *Jawad Casino Bot*
┣━━━━━━━━━━━━━━━━━━━━
┃
┃ 👋 Welcome
┃
┣━━ 🎮 Games
┃ 🎲 .coinflip
┃ 🎡 .roulette
┃ 🃏 .blackjack
┃ 🎯 .dice
┃
┣━━ 💰 Economy
┃ 💳 .balance
┃ 🎁 .daily
┃ 💸 .give
┃
┣━━ ⚙ Utility
┃ 🏓 .ping
┃ 📋 .menu
┃
┣━━ 👑 Owner
┃ 👤 .owner
┃
╰━━━━━━━━━━━━━━━━━━━━`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: menu
        });

    }

};
