import "@/models/Session";
import mongoose from "mongoose";

const SemesterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Semester ||
  mongoose.model("Semester", SemesterSchema);
