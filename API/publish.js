const fs = require("fs")
const path = require("path")

const DATA_FILE = path.join(process.cwd(), "data", "scripts.json")

const API_KEY = process.env.API_KEY

function loadScripts() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, "[]")
    }

    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"))
}

function saveScripts(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2))
}

module.exports = async (req, res) => {
    if (req.method !== "POST") {
        return res.status(405).json({
            success: false,
            message: "POST only"
        })
    }

    try {
        const body = req.body

        if (!body.password || body.password ~= API_KEY) {
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            })
        }

        const scripts = loadScripts()

        const newScript = {
            id: "Script_" + Math.random().toString(16).slice(2, 10),
            name: body.name || "Unnamed",
            code: body.code || "",
            author: body.author || "Unknown",
            public: true,
            created: Date.now()
        }

        scripts.push(newScript)

        saveScripts(scripts)

        return res.status(200).json({
            success: true,
            script: newScript
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.toString()
        })
    }
}
