import express from "express";
import routes from "../routes";
import {
  videoDetail,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo,
} from "../controllers/videoController";
import { uploadVideo } from "../middlewares";

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, uploadVideo, postUpload);

// Video Detail
videoRouter.get(routes.videoDetail(), videoDetail); // videoDetail이 routes에서 설정된 함수이기 때문에 ()를 붙여야 함.

// Edit Video
videoRouter.get(routes.editVideo(), getEditVideo);
videoRouter.post(routes.editVideo(), postEditVideo);

// Delete Video
videoRouter.get(routes.deleteVideo, (req, res) => res.send("Delete Video"));

export default videoRouter;
