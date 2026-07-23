module.exports = {

    name: "owner",
    description: "Bot Owner Information",

    async execute(sock, msg) {

        const ownerText = `╭━━━━━━━━━━━━━━━━━━━━━━
┃ 👑 *JAWAD-MD OWNER*
┣━━━━━━━━━━━━━━━━━━━━━━
┃
┃ 👤 Name
┃ ➜ Jawad Ahmad
┃
┃ 🤖 Bot
┃ ➜ Jawad-Md
┃
┃ 📞 Contact
┃ ➜ +92 345 6764744
┃
┃ 💬 Need Help?
┃ ➜ Contact the owner for support.
┃
╰━━━━━━━━━━━━━━━━━━━━━━`;

        await sock.sendMessage(msg.key.remoteJid, {
            text: ownerText
        });

    }

};
