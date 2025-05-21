import { connect } from "@/lib/database";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connect();

    const token = req.cookies.get("token");
    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token.value, process.env.AUTH_SECRET!) as {
      _id: string;
    };
    if (!decoded._id) throw new Error("Unauthorized");

    const user = await User.findOne({ _id: decoded._id, role: "Admin" });
    if (!user) throw new Error("Unauthorized");

    return NextResponse.json({
      message: "User found",
      user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message, error, user: null },
      { status: 401 },
    );
  }
}
