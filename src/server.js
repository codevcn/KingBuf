import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import routes from "./routes/routes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Cấu hình view engine EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

// Chia sẻ thư mục public
app.use(express.static(path.join(__dirname, "../public")))

// Sử dụng Router
app.use("/", routes)

// Middleware xử lý 404
routes.use((req, res) => {
   res.status(404).render("not-found-page")
})

app.use((err, req, res, next) => {
   console.log(">>> err:", err)
   res.status(500).send("Something broke at server!")
})

const PORT = 8080
app.listen(PORT, () =>
   console.log(`Server running on http://localhost:${PORT}`)
)
