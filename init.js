import app from "./app" // npm모듈이 아니므로 ./으로 경로명을 써주어야 함

const PORT = 4000;

const handleListening = () => console.log(`listening on http://localhost:${PORT}`);

app.listen(PORT, handleListening);