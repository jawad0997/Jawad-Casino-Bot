module.exports = {

    name: "alive",
    description: "Check bot status",

    async execute(sock, msg) {

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━━━━━━━━━━━━━━━━
┃ 🤖 *Jawad-Md*
┣━━━━━━━━━━━━━━━━━━
┃
┃ ✅ Status : Online
┃ ⚡ Speed : Excellent
┃ 🔥 Version : 1.0.0
┃
╰━━━━━━━━━━━━━━━━━━`
        });

    }

};
