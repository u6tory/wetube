import express from "express";
import routes from "../routes";
import {
  getEditProfile,
  userDetail,
  getChangePassword,
  postEditProfile,
  postChangePassword,
} from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile); // userDetail 보다 아래에 있으면 :id 로 인식하니 주의
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
