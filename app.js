import express from "express"; // 좀 더 현대적인 형태
import helmet from "helmet"; // Security
import morgan from "morgan"; // Logging
import cookieParser from "cookie-parser"; // 쿠키 분석 툴
import bodyParser from "body-parser"; // body data 분석 like json, urlencoded
import { localsMiddleware } from "./middlewares.js";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import videoRouter from "./routers/videoRouter.js";
import apiRouter from "./routers/apiRouter.js";
import routes from "./routes";
import passport from "passport";
import "./passport";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import flash from "express-flash";

const app = express();

app.use(helmet());
app.use(flash());

const CokieStore = MongoStore(session);

app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CokieStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware); // router에 들어가기 전에 전역변수 middleware를 거치도록 만든다.

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app; // 이 파일을 import 하면 app을 기본적으로 내보낸다.
