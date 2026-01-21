import bcrypt from "bcryptjs";
import User from "../models/User.model.js";

export const createEditor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ 
        message: "All fields required" 
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ 
        message: "Editor already exists" 
      });
    }

    const hashed = await bcrypt.hash(password, 12);

    const editor = await User.create({
      name,
      email,
      password: hashed,
      role: "editor",
    });

    res.status(201).json({
      message: "Editor created successfully",
      editor: {
        id: editor._id,
        name: editor.name,
        email: editor.email,
        role: editor.role
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const getAllEditors = async (req, res) => {
  try {
    const editors = await User.find({ role: "editor" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json(editors);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const deleteEditor = async (req, res) => {
  try {
    const { id } = req.params;

    const editor = await User.findOneAndDelete({ 
      _id: id, 
      role: "editor" 
    });

    if (!editor) {
      return res.status(404).json({ 
        message: "Editor not found" 
      });
    }

    res.json({ 
      message: "Editor deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};