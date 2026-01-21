import Service from "../models/Service.model.js";

export const createService = async (req, res) => {
  try {
    const service = await Service.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!service) {
      return res.status(404).json({ 
        message: "Service not found" 
      });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      return res.status(404).json({ 
        message: "Service not found" 
      });
    }

    res.json({ 
      message: "Service deleted" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true })
      .sort({ createdAt: -1 });

    res.json(services);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const getAllServices = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Service.countDocuments();

    const services = await Service.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      count: services.length,
      services
    });
  } catch (error) {
    next(error);
  }
};
