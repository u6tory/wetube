import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    // async-await의 에러는 try-catch로 잡아야 한다.
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    const videos = Video.find();
    console.log(`An error occured by ${error}`);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = async (req, res) => {
  const {
    query: { search: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" }, // Case-insensitive
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "upload" });
};

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    const video = await Video.findOneAndUpdate(
      { _id: id },
      { title, description }
    );
    res.redirect(routes.videoDetail(id), {
      pageTitle: "videoDetail",
      video,
    });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};
