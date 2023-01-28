import jsonwebtoken from "jsonwebtoken";
import User from "../models/userModel";

export const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { id } = jsonwebtoken.verify(token, process.env.SECRET);
    req.user = await User.findOne({ _id: id }).select("_id");
    next();
  } catch (err) {
    res.status(401).json({ error: "Request is not authorized" });
  }
};
