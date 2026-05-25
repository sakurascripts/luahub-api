const fs = require("fs");
const path = require("path");

export default function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "POST only"
        });
    }

    const PASSWORD = "passwordapikey123";

    const {
        password,
        title,
        script
    } = req.body;

    if (password !== PASSWORD) {
        return res.status(401).json({
            error: "Wrong password"
        });
    }

    const file = path.join(process.cwd(), "data", "scripts.json");

    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, "[]");
    }

    const scripts = JSON.parse(fs.readFileSync(file));

    scripts.push({
        title,
        script,
        time: Date.now()
    });

    fs.writeFileSync(
        file,
        JSON.stringify(scripts, null, 2)
    );

    res.status(200).json({
        success: true
    });
}
