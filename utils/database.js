const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "database", "users.json");

function loadDB() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, "{}");
    }

    return JSON.parse(fs.readFileSync(DB_PATH));
}

function saveDB(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

function getUser(id) {

    const db = loadDB();

    if (!db[id]) {
        db[id] = {
            coins: 1000,
            bank: 0,
            level: 1,
            xp: 0,
            wins: 0,
            losses: 0,
            daily: 0
        };

        saveDB(db);
    }

    return db[id];
}

function updateUser(id, data) {

    const db = loadDB();

    db[id] = data;

    saveDB(db);
}

module.exports = {
    getUser,
    updateUser
};
