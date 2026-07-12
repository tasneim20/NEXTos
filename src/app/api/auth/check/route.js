import jwt from "jsonwebtoken";

export async function GET(req) {
  const cookie = req.headers.get("cookie");

  const token = cookie
    ?.split("; ")
    .find((item) => item.startsWith("accessToken="))
    ?.split("=")[1];

  if (!token) {
    return Response.json({ message: "Not authenticated" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    return Response.json({ user: decoded }, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Invalid token" }, { status: 401 });
  }
}
