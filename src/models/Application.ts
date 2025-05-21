import "@/models/User";
import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    dateOfBirth: Date,
    stateOfOrigin: {
      type: String,
      required: true,
    },
    lga: {
      type: String,
      required: true,
    },
    contactAddress: {
      type: String,
      required: true,
    },
    nextOfKin: {
      type: String,
      required: true,
    },
    nextOfKinPhone: {
      type: String,
      required: true,
    },

    examType: {
      type: String,
      required: true,
    },
    examNumber: {
      type: String,
      required: true,
    },
    examYear: {
      type: String,
      required: true,
    },
    subjects: {
      type: [
        {
          subject: String,
          grade: String,
        },
      ],
      required: true,
    },
    resultFile: {
      type: {
        url: String,
        mime: String,
      },
      required: true,
    },
    termsAccepted: Boolean,

    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

export default mongoose.models.Application ||
  mongoose.model("Application", ApplicationSchema);
