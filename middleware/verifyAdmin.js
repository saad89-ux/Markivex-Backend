const verifyAdmin = (req, res, next) => {
  if (!["admin", "superadmin"].includes(req.user.role)) {
  return res.status(403).json({
    message: "Admin access required"
  });
}
  next();
};

export default verifyAdmin;