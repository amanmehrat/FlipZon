import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "somethingNotShared", // value taken from .env file which contains all secret/sensitive info. install dotenv and use. Add or only in dev env not in production
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // As format is Bearer XXXX where XX is token. Hence 7 removes the first 7 characters(BEARER )
    jwt.verify(
      token,
      process.env.JWT_SECRET || "somethingNotShared",
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: "Invalid Token" });
        } else {
          req.user = decode; // decode contains data as defined in jwt.sign
          next(); // req with user property is passed to next middlewear
        }
      }
    );
  } else {
    res.status(401).send({ message: "Invalid Token" });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Not An Admin" });
  }
};
