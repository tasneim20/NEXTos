import jwt from "jsonwebtoken";

export function createAccessToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" },
  );
}

export function createRefreshToken(user) {
  return jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
}
