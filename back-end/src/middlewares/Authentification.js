import jwt from "jsonwebtoken";

class Authentification {
  static async authenticate(req, res, next) {
    try {
      const token = req.headers.authorization?.split(" ")[1] ?? "no token ";
      const userInfo = jwt.verify(token, process.env.APP_SECRET);
      if (userInfo && userInfo.exp > Date.now() / 1000) {
        req.userInfo = userInfo;
        return next();
      }
      return res
        .status(401)
        .json({ message: "mauvais token ou token perimée" });
    } catch (err) {
      return res
        .status(401)
        .json({ message: "mauvais token ou token perimée" });
    }
  }
  static async authenticateAdmin(req, res, next) {
    try {
      if (req.userInfo.isAdmin) {
        return next();
      }
      return res.status(401).json({
        message: "vous n'avez pas les droits nécessaires",
        success: false,
      });
    } catch (err) {
      return res.status(401).json({ message: err.message, success: false });
    }
  }

  static async refreshToken(req, res, next) {
    try {
      const token = await Authentification.generateToken(req.userInfo);
      req.token = token;
      next();
    } catch (err) {
      return res
        .status(401)
        .json({ message: "mauvais token ou token perimée" });
    }
  }

  static async generateToken(user) {
    const token = jwt.sign(user, process.env.APP_SECRET, {
      expiresIn: "36000s",
    });
    return token;
  }
}
export default Authentification;
