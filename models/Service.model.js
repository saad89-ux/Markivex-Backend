import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    serviceName: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    shortDescription: String,
    icon: String,
    isActive: { 
      type: Boolean, 
      default: true 
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Service", serviceSchema);