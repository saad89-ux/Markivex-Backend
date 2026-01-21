import Testimonial from "../models/Testimonial.model.js";
import { deleteFromCloudinary } from "../utils/cloudinaryUpload.js";

export const createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(testimonial);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!testimonial) {
      return res.status(404).json({ 
        message: "Testimonial not found" 
      });
    }

    res.json(testimonial);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const { id } = req.params;

    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({ 
        message: "Testimonial not found" 
      });
    }

    // Delete avatar from Cloudinary
    if (testimonial.avatar?.publicId) {
      await deleteFromCloudinary(testimonial.avatar.publicId);
    }

    await Testimonial.findByIdAndDelete(id);

    res.json({ 
      message: "Testimonial deleted" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isPublished: true })
      .sort({ createdAt: -1 });

    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const getAllTestimonials = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Testimonial.countDocuments();

    const testimonials = await Testimonial.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      count: testimonials.length,
      testimonials
    });
  } catch (error) {
    next(error);
  }
};
