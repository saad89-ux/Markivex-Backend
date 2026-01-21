import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { 
      type: String, 
      required: true 
    },
    feedback: { 
      type: String, 
      required: true 
    },
    company: String,
    role: String,
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5
    },
    avatar: {
      url: String,
      publicId: String
    },
    isPublished: { 
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

export default mongoose.model("Testimonial", testimonialSchema);