import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

import { createAccessToken, createRefreshToken } from "@/lib/tokens";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        { message: "Email and password required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const accessToken = createAccessToken(user);

    const refreshToken = createRefreshToken(user);

    const response = Response.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

    response.headers.append(
      "Set-Cookie",
      `accessToken=${accessToken};
       HttpOnly;
       Path=/;
       Max-Age=900;
       SameSite=Strict`,
    );

    response.headers.append(
      "Set-Cookie",
      `refreshToken=${refreshToken};
       HttpOnly;
       Path=/;
       Max-Age=604800;
       SameSite=Strict`,
    );

    return response;
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
