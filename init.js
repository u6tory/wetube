import "./db";
import app from "./app"; // npm모듈이 아니므로 ./으로 경로명을 써주어야 함
import dotenv from "dotenv";

dotenv.config()

const PORT = process.env.PORT;

const handleListening = () => console.log(`listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);