import fs from "fs";

const DB_FILE = "database/cert-db.json";

export function readDB() {
    return JSON.parse(
        fs.readFileSync(DB_FILE, "utf8")
    );
}

export function writeDB(data) {
    fs.writeFileSync(
        DB_FILE,
        JSON.stringify(data, null, 2)
    );
}
