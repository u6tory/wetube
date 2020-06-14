import express from "express"; // 좀 더 현대적인 형태
const app = express();

const handleListening = () => {
    console.log("listening on port 4000");
}

const handleHome = (req, res) => { 
    console.log(req);            // 유저가 보낸 정보는 req Obj.에 담기고
    res.send("hello from home"); // 우리는 res. 객체의 send로 보낸다.
}

app.get('/', handleHome); // get으로 '/' 경로로 요청이 들어오면 handleHome 함수를 실행한다.

app.listen(4000, handleListening);