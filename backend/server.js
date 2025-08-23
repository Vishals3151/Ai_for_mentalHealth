/* Root file ─ starts Express app */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { connectDB } from "./src/config/database.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import authRoutes from "./src/routes/auth.js";
import moodRoutes from "./src/routes/mood.js";
import goalRoutes from "./src/routes/goals.js";
import analyticsRoutes from "./src/routes/analytics.js";
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 200 }));

/* Base Routes */
app.use("/api/auth", authRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/analytics", analyticsRoutes);

/* Central error handler */
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀  Server running on port ${PORT}`));
