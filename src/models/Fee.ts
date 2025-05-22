import mongoose from "mongoose";

const FeeSchema = new mongoose.Schema(
  {
    applicationFee: {
      type: Number,
      required: true,
    },
    schoolFees: [
      {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.models.Fee || mongoose.model("Fee", FeeSchema);
