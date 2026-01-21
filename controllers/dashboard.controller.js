import User from "../models/User.model.js";
import Service from "../models/Service.model.js";
import Contact from "../models/Contact.model.js";

export const getAdminDashboard = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalServices = await Service.countDocuments();
    const totalContacts = await Contact.countDocuments();

    const recentUsers = await User.find()
      .select("name email role createdAt")
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      totalUsers,
      totalServices,
      totalContacts,
      recentActivity: recentUsers
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
}