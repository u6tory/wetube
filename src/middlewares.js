import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-1",
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube/video",
  }),
});
const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "wetube/avatar",
  }),
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

// middleWare를 거치게 하면서 전역 변수를 적용시킨다.
export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube"; // siteName 이라는 전역변수로 작용
  res.locals.routes = routes; // routes 같은 Obj도 사용 가능
  res.locals.loggedUser = req.user || null; // pasport가 req에 user를 추가해준다.
  // console.log(req);
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
