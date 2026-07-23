module.exports = {

    name: "help",
    description: "Show help for commands",

    async execute(sock, msg, args) {

        // .help
        if (!args.length) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text:
`╭━━━━━━━━━━━━━━━━━━━━
┃ 📖 *HELP CENTER*
┣━━━━━━━━━━━━━━━━━━━━
┃
┃ Need information about
┃ a specific command?
┃
┃ 📌 Usage:
┃ ➜ .help <command>
┃
┃ Examples:
┃ ➜ .help ping
┃ ➜ .help menu
┃ ➜ .help owner
┃ ➜ .help alive
┃ ➜ .help balance
┃ ➜ .help coinflip
┃ ➜ .help roulette
┃ ➜ .help slot
┃
╰━━━━━━━━━━━━━━━━━━━━`
            });
        }

        const cmd = args[0].toLowerCase();

        const helps = {

            ping: {
                desc: "Check the bot response speed.",
                usage: ".ping",
                example: ".ping"
            },

            menu: {
                desc: "Display all available commands.",
                usage: ".menu",
                example: ".menu"
            },

            owner: {
                desc: "Show the owner's information.",
                usage: ".owner",
                example: ".owner"
            },

            alive: {
                desc: "Check whether the bot is online.",
                usage: ".alive",
                example: ".alive"
            },

            balance: {
                desc: "View your current coin balance.",
                usage: ".balance",
                example: ".balance"
            },

            coinflip: {
                desc: "Bet coins on Heads or Tails.",
                usage: ".coinflip <heads/tails> <bet>",
                example: ".coinflip heads 500"
            },

            roulette: {
                desc: "Play roulette with your selected bet.",
                usage: ".roulette <bet>",
                example: ".roulette 1000"
            },

            slot: {
                desc: "Spin the slot machine for rewards.",
                usage: ".slot <bet>",
                example: ".slot 250"
            }

        };

        if (!helps[cmd]) {
            return await sock.sendMessage(msg.key.remoteJid, {
                text: `❌ Command "${cmd}" not found.\n\nUse .menu to see all commands.`
            });
        }

        const h = helps[cmd];

        await sock.sendMessage(msg.key.remoteJid, {
            text:
`╭━━━━━━━━━━━━━━━━━━━━
┃ 📖 COMMAND HELP
┣━━━━━━━━━━━━━━━━━━━━
┃
┃ 🎮 Command
┃ ➜ ${cmd}
┃
┃ 📝 Description
┃ ➜ ${h.desc}
┃
┃ 📌 Usage
┃ ➜ ${h.usage}
┃
┃ 💡 Example
┃ ➜ ${h.example}
┃
╰━━━━━━━━━━━━━━━━━━━━`
        });

    }

};
