import express from "express"
import cors from "cors";
import passport from "passport";
import session from "express-session";
import errorMiddleware from "./Middleware/ErrorHandling.middleware.js";
import authRouter from "./Routes/Auth.route.js";
import userRouter from "./Routes/User.routes/User.route.js";
import userRoadmapRouter from "./Routes/User.routes/UserRoadmap.route.js";
import adminRouter from "./Routes/Admin.route/admin.route.js";
import  roadmapRouter from "./Routes/User.routes/Roadmap.route.js"
import progressRouter from "./Routes/User.routes/Progress.route.js"
import projectRouter from "./Routes/User.routes/Project.route.js"
import { authMiddleware } from "./Middleware/Auth.middleware.js"
import {optionalAuth} from "./Middleware/OptionalAuth.middleware.js"
import cookieParser from "cookie-parser";
import meRouter from "./Routes/UserInfo.route.js"
import quizRouter from "./Routes/User.routes/Quiz.route.js";
import dotenv from "dotenv";

dotenv.config({ pah: "./env" });
const app = express();

const allowedOrigins = [
  `${process.env.PRODUCTION_URL}`, // Your local Vite development server
  `${process.env.LOCAL_URL}`, // Add your production frontend URL here later
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200, // Fixes legacy browser preflight issues (OPTIONS 204 vs 200)
  }),
);
 app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized:true
}))
app.use(express.static("Public"))
// app.use(passport.initialize());
// app.use(passport.session());
app.use("/auth", authRouter);
app.use(optionalAuth);
app.use("/roadmap", roadmapRouter);
app.use("/project", projectRouter);

app.use(authMiddleware);
app.use(meRouter);
app.use("/quiz",quizRouter)
app.use("/user", userRouter);
app.use("/user-roadmap", userRoadmapRouter);
app.use("/admin",adminRouter)
app.use("/progress", progressRouter);

app.use(errorMiddleware);

export default  app;