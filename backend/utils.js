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
