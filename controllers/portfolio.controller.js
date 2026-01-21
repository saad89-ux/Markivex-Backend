import Portfolio from "../models/Portfolio.model.js";
import { deleteFromCloudinary } from "../utils/cloudinaryUpload.js";

export const createPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(portfolio);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!portfolio) {
      return res.status(404).json({ 
        message: "Portfolio not found" 
      });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({ 
        message: "Portfolio not found" 
      });
    }

    // Delete images from Cloudinary
    for (const image of portfolio.images) {
      if (image.publicId) {
        await deleteFromCloudinary(image.publicId);
      }
    }

    await Portfolio.findByIdAndDelete(id);

    res.json({ 
      message: "Portfolio deleted" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const getPortfolios = async (req, res) => {
  try {
    const { category } = req.query;
    
    const filter = { isPublished: true };
    if (category) filter.category = category;

    const portfolios = await Portfolio.find(filter)
      .sort({ createdAt: -1 });

    res.json(portfolios);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};
export const getAllPortfolios = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Portfolio.countDocuments();

    const portfolios = await Portfolio.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      count: portfolios.length,
      portfolios
    });
  } catch (error) {
    next(error);
  }
};
;