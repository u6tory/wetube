import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos" }); // videos 폴더에 저장한다.

// middleWare를 거치게 하면서 전역 변수를 적용시킨다.
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube"; // siteName 이라는 전역변수로 작용
  res.locals.routes = routes; // routes 같은 Obj도 사용 가능
  res.locals.user = {
    isAuthenticated: false, // login test를 하기 위한 임시 승인
    id: 5,
  };
  next(); // 이걸 해줘야 middleWare -> router로 전송된다.
};

export const uploadVideo = multerVideo.single("videoFile");
