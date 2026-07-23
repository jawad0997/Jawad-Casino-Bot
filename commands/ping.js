module.exports = {

    name: "ping",

    description: "Show bot latency",

    async execute(sock, msg) {

        const start = Date.now();

        const sent = await sock.sendMessage(
            msg.key.remoteJid,
            {
                text: "🏓 Checking..."
            }
        );

        const ping = Date.now() - start;

        await sock.sendMessage(
            msg.key.remoteJid,
            {
                edit: sent.key,
                text:
`╭━━━━━━━━━━━━━━━━━━
┃ 🤖 Jawad Casino Bot
┣━━━━━━━━━━━━━━━━━━
┃
┃ 🏓 Ping : ${ping} ms
┃
╰━━━━━━━━━━━━━━━━━━`
            }
        );

    }

};
