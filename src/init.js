import "@babel/polyfill";
import dotenv from "dotenv";
import "./db";
import app from "./app"; // npm모듈이 아니므로 ./으로 경로명을 써주어야 함

dotenv.config();

import "./models/Video"; // export default 해주었기 때문에 바로 파일을 지정해준다.
import "./models/Comment";
import "./models/User";

const PORT = process.env.PORT;

const handleListening = () => console.log(`listening ${PORT}`);

app.listen(PORT, handleListening);
