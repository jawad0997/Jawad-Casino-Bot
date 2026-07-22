const messageHandler = require("./events/message");

const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");

const P = require("pino");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState("./session");

  // Latest WhatsApp version fetch
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: "silent" }),
    browser: ["Jawad Casino Bot", "Chrome", "1.0.0"]
  });

  // Pair Code Login
  sock.ev.on("connection.update", async (update) => {
    const { connection } = update;

    if (connection === "connecting" && !state.creds.registered) {
      const phoneNumber = "923363665491"; // 👈 yahan apna WhatsApp number likho

      const code = await sock.requestPairingCode(phoneNumber);

      console.log("🔑 Pair Code:", code);
    }

    if (connection === "open") {
      console.log("✅ Jawad Casino Bot Connected!");
    }

    if (connection === "close") {
      console.log("❌ Disconnected. Restart the bot.");
    }
  });

  // Commands Handler
  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];

    if (!msg.key.fromMe) {
      messageHandler(sock, msg);
    }
  });

  // Save Session
  sock.ev.on("creds.update", saveCreds);
}

startBot();
