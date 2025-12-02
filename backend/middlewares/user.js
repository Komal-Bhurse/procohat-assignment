import { validateToken } from "../services/user.js";

export const isAdmin = (req, res, next) => {
  const reqUser = validateToken(req.cookies.admin_token);

  if (reqUser && !reqUser?.role === "Admin") {
    return res
      .status(404)
      .json({ status: false, data: "", message: "unauthorized user" });
  }

  req.user = reqUser;

  next();
};

export const isUser = (req, res, next) => {
  const reqUser = validateToken(req.cookies.user_token);
    if (reqUser && !reqUser?.role === "User") {
        return res.status(404).json({ status: false, data: "", message: "unauthorized user" });
    }

    req.user = reqUser;
    next();
};
