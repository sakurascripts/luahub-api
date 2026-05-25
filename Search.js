const fs = require("fs");
const path = require("path");

export default function handler(req, res) {
    const file = path.join(process.cwd(), "data", "scripts.json");

    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "[]");
    }

    const data = JSON.parse(fs.readFileSync(file));

    res.status(200).json(data);
}
