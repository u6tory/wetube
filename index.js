import express from "express"; // 좀 더 현대적인 형태
const app = express();
const PORT = 4000;

const handleListening = () => {
    console.log(`listening on port ${PORT}`);
}

const handleHome = (req, res) => { 
    console.log(req);            // 유저가 보낸 정보는 req Obj.에 담기고
    res.send("hello from my ass"); // 우리는 res. 객체의 send로 보낸다.
}

const betweenHome = (req, res, next) =>{  // middleware 뿐만 아니라 모두 다음으로 진행시키는 next라는 arg를 가진다. 
    console.log("I'm middleware");
    next();
}

const handleProfile = (req, res) => res.send(`You're on my profile`);

app.get('/', handleHome); 
app.get('/profile', betweenHome, handleProfile); // betweenHome 이라는 middleware 함수를 거쳤다가 handleProfile로 이동된다.

app.listen(PORT, handleListening);

