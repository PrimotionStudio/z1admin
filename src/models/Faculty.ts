import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
  },
  { timestamps: true },
);

export default mongoose.models.Faculty ||
  mongoose.model("Faculty", FacultySchema);
