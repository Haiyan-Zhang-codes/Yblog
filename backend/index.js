import dotenv from "dotenv";
if(process.env.NODE_ENV !== "production"){
  dotenv.config();
}
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";

import morgan from "morgan";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js"
import usersRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import {register} from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// FILE STORAGE
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/assets");
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage });

// FILE STORAGE IN CLOUDINARY
import { storage } from "./cloudinary/index.js"
const upload = multer({storage})

app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.array("picture"), createPost)
app.use("/auth", authRoutes)
app.use("/users", usersRoutes)
app.use("/posts", postRoutes)

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.DB_URL)
  .then(
    app.listen(PORT, () => {
      console.log(`Server Port: ${PORT}`);
    })
  )
  .catch((error) => {
    console.log(`${error} did not connect`);
  });

