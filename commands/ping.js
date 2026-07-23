module.exports = {
    name: "ping",
    description: "Shows bot latency",

    async execute(sock, msg) {
        const start = Date.now();

        const sent = await sock.sendMessage(msg.key.remoteJid, {
            text: "🏓 Checking Ping..."
        });

        const ping = Date.now() - start;

        await sock.sendMessage(msg.key.remoteJid, {
            edit: sent.key,
            text:
`╭━━━━━━━━━━━━━━━━
┃ 🤖 *Jawad Casino Bot*
┣━━━━━━━━━━━━━━━━
┃ ⚡ Real Time Ping
┃
┃ 🏓 ${ping} ms
╰━━━━━━━━━━━━━━━━`
        });
    }
};
