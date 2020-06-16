import {videos} from "../db"

export const home = (req, res) => res.render("home", {pageTitle: "Home", videos});
export const search = (req, res) => {
    console.log(req.query); // = {search:"검색어"} 로 출력됨.
    const {query: {search: searchingBy}} = req;
//  const {search: searchingBy} = req.query; 로도 가능하다.
    res.render("search", {pageTitle:"Search", searchingBy, videos}); // searchingBy: searchingBy 로도 가능
}