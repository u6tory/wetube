import express from "express";
import routes from "../routes";
import {
  editProfile,
  userDetail,
  changePassword,
} from "../controllers/userController";
import { onlyPrivate } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile); // userDetail 보다 아래에 있으면 :id 로 인식하니 주의
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
