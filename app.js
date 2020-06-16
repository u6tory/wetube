import express from "express"; // 좀 더 현대적인 형태
import helmet from "helmet"; // Security
import morgan from "morgan"; // Logging
import cookieParser from "cookie-parser"; // 쿠키 분석 툴
import bodyParser from "body-parser"; // body data 분석 like json, urlencoded

const app = express();

const handleHome = (req, res) => { 
    console.log(req);            // 유저가 보낸 정보는 req Obj.에 담기고
    res.send("hello from my ass"); // 우리는 res. 객체의 send로 보낸다.
}
const handleProfile = (req, res) => res.send(`You're on my profile`);

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));

app.get('/', handleHome); 
app.get('/profile', handleProfile); // betweenHome 이라는 middleware 함수를 거쳤다가 handleProfile로 이동된다.

export default app; // 이 파일을 import 하면 app을 기본적으로 내보낸다.

