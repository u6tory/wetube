import express from "express";
import routes from "../routes";
import {
  videoDetail,
  getUpload,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);
videoRouter.get(routes.videoDetail(), videoDetail); // videoDetail이 routes에서 설정된 함수이기 때문에 ()를 붙여야 함.
videoRouter.get(routes.editVideo, (req, res) => res.send("Edit Video"));
videoRouter.get(routes.deleteVideo, (req, res) => res.send("Delete Video"));

export default videoRouter;
