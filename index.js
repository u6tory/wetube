const express = require("express");
const app = express();

const handleListening = () => {
    console.log("listening on port 4000");
}

const handleHome = (req, res) => { 
    console.log(req);            // 유저가 보낸 정보는 req Obj.에 담기고
    res.send("hello from home"); // 우리는 res. 객체의 send로 보낸다.
}

app.get('/', handleHome);

app.listen(4000, handleListening);