const messageHandler = require("./events/message");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason
} = require("@whiskeysockets/baileys");

const P = require("pino");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  const sock = makeWASocket({
    auth: state,
    logger: P({ level: "silent" }),
    browser: ["Jawad Casino Bot", "Chrome", "1.0.0"]
  });
sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.key.fromMe) {
        messageHandler(sock, msg);
    }
});
  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", ({ connection }) => {
    if (connection === "open") {
      console.log("✅ Jawad Casino Bot Connected!");
    }

    if (connection === "close") {
      console.log("❌ Disconnected. Restart the bot.");
    }
  });
}

startBot();
