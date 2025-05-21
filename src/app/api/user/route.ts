import { connect } from "@/lib/database";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connect();
    const users = await User.find({
      verified: true,
    });
    return NextResponse.json(
      { message: "Applications found", users },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message, error },
      { status: 400 },
    );
  }
}
