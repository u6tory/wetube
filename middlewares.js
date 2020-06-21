import routes from "./routes";
import multer from "multer";

const multerVideo = multer({ dest: "uploads/videos" }); // videos 폴더에 저장한다.
const multerAvatar = multer({ dest: "uploads/avatars/" });

// middleWare를 거치게 하면서 전역 변수를 적용시킨다.
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube"; // siteName 이라는 전역변수로 작용
  res.locals.routes = routes; // routes 같은 Obj도 사용 가능
  res.locals.loggedUser = req.user || null; // pasport가 req에 user를 추가해준다.
  console.log(req.user);
  next(); // 이걸 해줘야 middleWare -> router로 전송된다.
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
