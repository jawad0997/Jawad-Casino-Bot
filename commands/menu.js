module.exports = {
    name: "menu",
    description: "Bot Menu",

    async execute(sock, msg) {

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━━━━━━━━━━━━━━━━
┃ 🎰 *Jawad Casino Bot*
┣━━━━━━━━━━━━━━━━━━
┃
┃ 📜 Available Commands
┃
┃ 🏓 .ping
┃ 📋 .menu
┃ 💰 .balance
┃ 🎁 .daily
┃ 🪙 .coinflip
┃ 🎡 .roulette
┃ 🃏 .blackjack
┃ 🎲 .dice
┃
╰━━━━━━━━━━━━━━━━━━`
        });

    }
};
