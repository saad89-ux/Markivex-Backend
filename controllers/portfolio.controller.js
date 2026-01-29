import Portfolio from "../models/Portfolio.model.js";

export const createPortfolio = async (req, res) => {
  try {
    const user = req.user;
    const { title, description, category, images } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: "All fields required",
        status: false,
      });
    }

    await Portfolio.create({
      title,
      description,
      category,
      images, // 🔥 already uploaded (same as uploadedEvidence)
      createdBy: user.id,
    });

    res.status(201).json({
      message: "Portfolio created successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const updatePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, images, isPublished } = req.body;

    const portfolio = await Portfolio.findById(id);
    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
        status: false,
      });
    }

    portfolio.title = title ?? portfolio.title;
    portfolio.description = description ?? portfolio.description;
    portfolio.category = category ?? portfolio.category;
    portfolio.images = images ?? portfolio.images;
    portfolio.isPublished = isPublished ?? portfolio.isPublished;

    await portfolio.save();

    res.status(200).json({
      message: "Portfolio updated successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;

    const portfolio = await Portfolio.findByIdAndDelete(id);
    if (!portfolio) {
      return res.status(404).json({
        message: "Portfolio not found",
        status: false,
      });
    }

    res.status(200).json({
      message: "Portfolio deleted successfully",
      status: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getPortfolios = async (req, res) => {
  try {
    const data = await Portfolio.find({ isPublished: true }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Portfolio fetched",
      status: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};

export const getAllPortfolios = async (req, res) => {
  try {
    const data = await Portfolio.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "All portfolios fetched",
      status: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: false,
    });
  }
};
