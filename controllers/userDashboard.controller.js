export const getEditorDashboard = async (req, res) => {
  try {
    res.json({
      message: "Editor dashboard loaded",
      editor: {
        id: req.user.id,
        name: req.user.name,
        role: req.user.role
      },
      permissions: [
        "create_service",
        "update_service",
        "upload_images",
        "manage_portfolio",
        "manage_testimonials"
      ]
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
