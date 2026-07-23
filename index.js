require("dotenv").config();
const fs = require("fs");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  Browsers
} = require("@whiskeysockets/baileys");
const P = require("pino");
const messageHandler = require("./events/message");

async function startBot() {
  try {
    // Check if session exists
    const sessionExists = fs.existsSync("./session/creds.json");
    
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      version,
      auth: state,
      logger: P({ level: "silent" }),
      // FIX: Use Chrome fingerprint that's whitelisted
      browser: ["Chrome (Windows)", "", ""],
      printQRInTerminal: true, // Use QR — more reliable than pairing code
      syncFullHistory: false,
      markOnlineOnConnect: true,
      // FIX: Add these to avoid detection
      connectTimeoutMs: 60000,
      defaultQueryTimeoutMs: 60000,
      keepAliveIntervalMs: 10000,
    });

    sock.ev.on("creds.update", saveCreds);

    // If no session, show QR only
    if (!sessionExists) {
      console.log("\n📱 SCAN THIS QR CODE WITH WHATSAPP:");
      console.log("🔹 Open WhatsApp > Linked Devices > Link with QR code\n");
    }

    sock.ev.on("connection.update", ({ connection, lastDisconnect, qr }) => {
      if (qr) {
        console.log("\n🔹 SCAN THIS QR CODE:");
        console.log(qr);
        console.log("\n📌 Open WhatsApp > Linked Devices > Link with QR code\n");
      }

      if (connection === "open") {
        console.log("✅ Jawad Casino Bot Connected Successfully!");
        console.log(`🤖 Bot Name: ${process.env.BOT_NAME || "Jawad Casino Bot"}`);
        console.log(`📌 Prefix: ${process.env.PREFIX || "!"}`);
      }

      if (connection === "close") {
        const status = lastDisconnect?.error?.output?.statusCode;
        console.log("❌ Connection closed:", status);

        if (status === DisconnectReason.loggedOut) {
          console.log("🗑 Logged out. Clearing session...");
          fs.rmSync("./session", { recursive: true, force: true });
          console.log("🔄 Restart to get new QR code");
        } else {
          console.log("🔄 Reconnecting in 5s...");
          setTimeout(startBot, 5000);
        }
      }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
      try {
        const msg = messages[0];
        if (!msg?.message || msg.key?.fromMe) return;
        await messageHandler(sock, msg);
      } catch (e) {
        console.error("❌ Message error:", e.message);
      }
    });

  } catch (err) {
    console.error("❌ Critical error:", err.message);
    setTimeout(startBot, 5000);
  }
}

startBot();
