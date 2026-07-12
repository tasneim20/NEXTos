import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return Response.json({ message: "Invalid email" }, { status: 400 });
    }

    if (password.length < 8) {
      return Response.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return Response.json(
        { message: "Email already exists" },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json({ message: "User created" });
  } catch (error) {
    return Response.json({ message: "Server error" }, { status: 500 });
  }
}
