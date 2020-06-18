import routes from "../routes";

export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });
export const search = (req, res) => {
  console.log(req.query); // = {search:"검색어"} 로 출력됨.
  const {
    query: { search: searchingBy },
  } = req;
  //  const {search: searchingBy} = req.query; 로도 가능하다.
  res.render("search", { pageTitle: "Search", searchingBy, videos }); // searchingBy: searchingBy 로도 가능
};
export const videoDetail = (req, res) => {
  res.render("videoDetail", { pageTitle: "videoDetail", videos });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "upload" });
};

export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  // To-Do: upload and save video
  res.redirect(routes.videoDetail(324393));
};
