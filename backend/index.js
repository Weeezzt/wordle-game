import express from "express";
import "express-async-errors";
import path from "path";
import router from "./routes/routes.js";
import dotenv from "dotenv";
import { connectDb } from "./db/connect.js";
dotenv.config();

const app = express();

// Creating the __filename and __dirname variables
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const PORT = process.env.PORT || 5080;

app.use(express.static(path.join(__dirname, "./public")));

app.use("/", router);

// Await the connection to the database before starting the server
const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

start();
