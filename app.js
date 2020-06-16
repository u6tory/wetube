import express from "express"; // 좀 더 현대적인 형태
import helmet from "helmet"; // Security
import morgan from "morgan"; // Logging
import cookieParser from "cookie-parser"; // 쿠키 분석 툴
import bodyParser from "body-parser"; // body data 분석 like json, urlencoded
import userRouter from "./routers/userRouter.js"
import globalRouter from "./routers/globalRouter.js"
import videoRouter from "./routers/videoRouter.js"
import routes from "./routes"

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; // 이 파일을 import 하면 app을 기본적으로 내보낸다.

