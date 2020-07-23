import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });
export const postJoin = async (req, res, next) => {
  // GET은 query에 POST는 body에 실려온다. bodyParser의 필요성.
  const {
    body: { name, email, password, password2 }, // name: name, 을 한번에 담기
  } = req;
  if (password !== password2) {
    req.flash("error", "비밀번호가 잘못되었습니다.");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};
export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Log In" });

export const postLogin = passport.authenticate("local", {
  // strategy name
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "반갑습니다.",
  failureFlash: "이메일 혹은 비밀번호를 확인하세요.",
});

//// github 로그인
export const githubLogin = passport.authenticate("github", {
  successFlash: "반갑습니다.",
  failureFlash: "로그인 할 수 없습니다.",
});

// gitHub Strategy의 callback
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, email, name }, // 나는 name이 null이므로 그냥 login id를 name으로 저장
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl: avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
}; // accessToken, refreshToken을 _, __로 지워버림ㅋㅋ

// github 로그인 후 redirect 할 함수
export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

//// FACEBOOK LOGIN

export const facebookLogin = passport.authenticate("facebook", {
  successFlash: "반갑습니다.",
  failureFlash: "로그인 할 수 없습니다.",
});

export const facebookLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.facebookId = id;
      user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      facebookId: id,
      avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postFacebookLogin = (req, res) => res.redirect(routes.home);

export const logout = (req, res) => {
  req.flash("info", "정상적으로 로그아웃 되었습니다.");
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id }, // routes.js 에서 :id 로 받기 때문에
  } = req;
  try {
    const user = await User.findById(id).populate("videos"); // user정보에서 video list를 가져오기 위해
    // console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    req.flash("error", "회원정보가 존재하지 않습니다.");
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    req.flash("success", "프로필이 업데이트 되었습니다.");
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "프로필을 업데이트 할 수 없습니다.");
    res.render("editProfile", { pageTitle: "Edit Profile" });
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "비밀번호가 일치하지 않습니다.");
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    req.flash("error", "오류가 발생하여 비밀번호를 바꿀 수 없습니다.");
    res.status(400);
    res.redirect(`/users/${routes.changePassword}`);
  }
};
