import jsonwebtoken from "jsonwebtoken";
import { config } from "dotenv";
import User from "../models/User.js";

config();
const secret = process.env.SECRET_KEY;

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(' ')[1];

  // check json web token exists & is verified
  if (token) {
    jsonwebtoken.verify(token, secret, (err, decodedToken) => {
      if (err) {
        console.log(`${err.message}: Unauthorized`);
        res.status(401).json({ message: 'Unauthorized' });
      } else {
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized" }); 
  }
};

// check current user
const checkUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);

        res.locals.user = null;
        next();
      } else {
        console.log(decodedToken);

        let user = await User.findById(decodedToken.id);

        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export { requireAuth, checkUser};
