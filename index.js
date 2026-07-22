require("dotenv").config();
const fs = require("fs"); 

const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
  Browsers // Added for authentic browser fingerprinting
} = require("@whiskeysockets/baileys");

const P = require("pino");
const messageHandler = require("./events/message");

async function startBot() {
  try {
    const { state, saveCreds } = await useMultiFileAuthState("./session");
    const { version, isLatest } = await fetchLatestBaileysVersion();
    
    console.log(`ℹ Using Baileys version: ${version.join('.')}, Is Latest: ${isLatest}`);

    const sock = makeWASocket({
      version,
      auth: state,
      logger: P({ level: "silent" }),
      // FIX: Standard desktop browser fingerprinting taake security bypass ho sake
      browser: Browsers.macOS("Desktop"), 
      printQRInTerminal: false,
      syncFullHistory: false,
      markOnlineOnConnect: true, // Device signal active rakhne ke liye true kiya
    });

    sock.ev.on("creds.update", saveCreds);

    // Pairing code generator
    if (!state.creds.registered) {
      try {
        // Delay incresed for clean connection initialization
        await new Promise((resolve) => setTimeout(resolve, 4000)); 
        
        let phoneNumber = process.env.OWNER;
        if (!phoneNumber) {
          throw new Error("OWNER phone number is missing in .env file!");
        }
        
        phoneNumber = phoneNumber.toString().replace(/[^0-9]/g, "");
        
        console.log(`📡 Requesting Pairing Code for: ${phoneNumber}`);
        const code = await sock.requestPairingCode(phoneNumber);
        console.log("🔑 New Pair Code:", code);
        console.log("Enter this code in WhatsApp > Linked Devices > Link with phone number");
      } catch (err) {
        console.error("❌ Pairing Error Details:", err.message || err);
      }
    }

    sock.ev.on("connection.update", ({ connection, lastDisconnect }) => {
      if (connection === "connecting") {
        console.log("🔄 Connecting...");
      }

      if (connection === "open") {
        console.log("✅ Jawad Casino Bot Connected Successfully!");
      }

      if (connection === "close") {
        const reason = lastDisconnect?.error?.output?.statusCode;
        console.log("❌ Connection Closed Code:", reason);

        if (reason !== DisconnectReason.loggedOut) {
          console.log("🔄 Reconnecting...");
          startBot();
        } else {
          console.log("⚠ Logged out! Cleaning up session folder...");
          try {
            fs.rmSync("./session", { recursive: true, force: true });
            console.log("🗑 Old session cleared.");
          } catch (err) {
            console.error("❌ Error clearing session folder:", err);
          }
          setTimeout(() => { startBot(); }, 4000);
        }
      }
    });

    sock.ev.on("messages.upsert", async ({ messages }) => {
      try {
        const msg = messages[0];
        if (!msg || !msg.message) return;
        if (msg.key && msg.key.fromMe) return;

        await messageHandler(sock, msg);
      } catch (msgErr) {
        console.error("❌ Message handler error:", msgErr);
      }
    });

  } catch (startErr) {
    console.error("❌ Critical Initialization Error:", startErr);
  }
}

process.on("unhandledRejection", (reason, promise) => {
  console.error("🚨 Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("🚨 Uncaught Exception thrown:", err);
});

startBot();
