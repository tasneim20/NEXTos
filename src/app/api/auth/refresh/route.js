import jwt from "jsonwebtoken";

export async function POST(req) {
  const cookies = req.headers.get("cookie");

  const refreshToken = cookies
    ?.split("; ")
    .find((item) => item.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) {
    return Response.json({ message: "No refresh token" }, { status: 401 });
  }
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_SECRET,
      { expiresIn: "15m" },
    );

    const response = Response.json({ message: "Token refreshed" });

    response.headers.append(
      "Set-Cookie",
      `accessToken=${newAccessToken};
       HttpOnly;
       Path=/;
       Max-Age=900;
       SameSite=Strict`,
    );

    return response;
  } catch {
    return Response.json({ message: "Invalid refresh token" }, { status: 401 });
  }
}
export async function POST() {
  const response = Response.json({
    message: "Logged out",
  });

  response.headers.append(
    "Set-Cookie",
    "accessToken=; HttpOnly; Path=/; Max-Age=0",
  );

  response.headers.append(
    "Set-Cookie",
    "refreshToken=; HttpOnly; Path=/; Max-Age=0",
  );

  return response;
}
