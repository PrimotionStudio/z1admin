import { connect } from "@/lib/database";
import User from "@/models/User";
import { UserRoleChange } from "@/types/User";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    await connect();
    const { userId, role } = (await request.json()) as UserRoleChange;
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) throw new Error("Cannot find user");
    return NextResponse.json({ message: "User role updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message, error },
      { status: 400 },
    );
  }
}
