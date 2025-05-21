import { connect } from "@/lib/database";
import { sendMail } from "@/lib/sendMail";
import User from "@/models/User";
import { LoggedInUser, LoginUser } from "@/types/User";
import { compare } from "bcryptjs";
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const user: LoginUser = await request.json();
    if (!user.email || !user.password)
      throw new Error("Missing required fields");

    const foundActivatedUser = await User.findOne({
      email: { $regex: `^${user.email}$`, $options: "i" },
      verified: true,
    });
    if (!foundActivatedUser) throw new Error("Cannot find account");

    const isPasswordValid = await compare(
      user.password,
      foundActivatedUser.password,
    );
    if (!isPasswordValid) throw new Error("Invalid email or password");

    const userData: LoggedInUser = {
      _id: foundActivatedUser._id,
      fullName: foundActivatedUser.fullName,
      email: foundActivatedUser.email,
      phone: foundActivatedUser.phone,
      createdAt: foundActivatedUser.createdAt,
      updatedAt: foundActivatedUser.updatedAt,
    };

    const token = jwt.sign(userData, process.env.AUTH_SECRET!, {
      expiresIn: "30d",
    });
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: userData,
      },
      { status: 200 },
    );
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 9999,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message, error },
      { status: 400 },
    );
  }
}
