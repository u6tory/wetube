import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    // async-await의 에러는 try-catch로 잡아야 한다.
    const videos = await Video.find();
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    const videos = Video.find();
    console.log(`An error occured by ${error}`);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  console.log(req.query); // = {search:"검색어"} 로 출력됨.
  const {
    query: { search: searchingBy },
  } = req;
  //  const {search: searchingBy} = req.query; 로도 가능하다.
  res.render("search", { pageTitle: "Search", searchingBy, videos }); // searchingBy: searchingBy 로도 가능
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: "videoDetail", video });
  } catch (error) {
    console.log(error);
    res.redirect(routs.home);
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
  });
  res.redirect(routes.videoDetail(newVideo.id));
};
