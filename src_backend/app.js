import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import path from "path"
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config();

const app = express();
// Cấu hình view engine EJS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Chia sẻ thư mục public
app.use(express.static(path.join(__dirname, "../public")))

// Cấu hình session
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Đổi thành true nếu dùng HTTPS
}));
import routes from "./routes_fe/routes.js"
// Sử dụng Router
app.use("/", routes)


// Import route
import adminRoutes from './routes/admin.routes.js';
import reservationRoutes from './routes/reservation.routes.js';
import diningTableRoutes from './routes/table.routes.js';

app.get("/testLogin",(req,res)=>{
  res.json(req?.session?.admin ? req.session.admin : {message:"Not logged in"});
});

// Sử dụng route admin
app.use('/api/admin', adminRoutes);

// Sử dụng route reservations
app.use('/api/reservations', reservationRoutes);

// Sử dụng route diningTables
app.use('/api/diningTable', diningTableRoutes);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
