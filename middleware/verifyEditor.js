const verifyEditor = (req, res, next) => {
  if (!["admin", "editor"].includes(req.user.role)) {
    return res.status(403).json({ 
      message: "Editor or Admin access required" 
    });
  }
  next();
};

export default verifyEditor;