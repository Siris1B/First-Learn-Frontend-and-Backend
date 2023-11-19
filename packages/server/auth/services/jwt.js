import jwt from "jsonwebtoken";

export default function jwtSign(userName, userEmail) {
  let token;
  try {
    token = jwt.sign(
      {
        userName,
        userEmail,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return token;
  } catch (e) {}
}
