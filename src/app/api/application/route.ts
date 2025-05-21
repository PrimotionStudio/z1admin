import { connect } from "@/lib/database";
import Application from "@/models/Application";
import User from "@/models/User";
import { ApplicationReview } from "@/types/Application";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  try {
    await connect();

    const { applicationId, status } =
      (await request.json()) as ApplicationReview;

    if (!applicationId) throw new Error("Cannot find applicationId");

    const application = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true },
    ).populate("userId");
    if (!application) throw new Error("Cannot find application");

    const user = await User.findByIdAndUpdate(
      application.userId._id,
      { role: "Student" },
      { new: true },
    );

    if (!user) throw new Error("Cannot find user");
    // TODO: send a mail to the student

    return NextResponse.json({ message: `Application ${status}` });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message, error },
      { status: 400 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connect();

    const applicationId = request.nextUrl.searchParams.get("applicationId");
    if (applicationId) {
      const application = await Application.findById(applicationId)
        .populate("userId")
        .sort({
          createdAt: -1,
        });
      return NextResponse.json(
        { message: "Application found", application },
        { status: 200 },
      );
    }

    const applications = await Application.find()
      .populate("userId")
      .sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Applications found", applications },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message, error },
      { status: 400 },
    );
  }
}
