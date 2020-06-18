import "./db";
import app from "./app"; // npm모듈이 아니므로 ./으로 경로명을 써주어야 함
import dotenv from "dotenv";
import "./models/Video"; // export default 해주었기 때문에 바로 파일을 지정해준다.
import "./models/Comments";

dotenv.config();

const PORT = process.env.PORT;

const handleListening = () =>
  console.log(`listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);
