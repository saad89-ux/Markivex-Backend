import Contact from "../models/Contact.model.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        message: "Name, email, and message required" 
      });
    }

    const contact = await Contact.create(req.body);

    res.status(201).json({
      message: "Thank you! We'll contact you soon.",
      contact
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = req.query.status ? { status: req.query.status } : {};

    const total = await Contact.countDocuments(filter);

    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      count: contacts.length,
      contacts
    });
  } catch (error) {
    next(error);
  }
};


export const updateContactStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["new", "contacted", "closed"].includes(status)) {
      return res.status(400).json({ 
        message: "Invalid status" 
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!contact) {
      return res.status(404).json({ 
        message: "Contact not found" 
      });
    }

    res.json(contact);
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    const contact = await Contact.findByIdAndDelete(id);

    if (!contact) {
      return res.status(404).json({ 
        message: "Contact not found" 
      });
    }

    res.json({ 
      message: "Contact deleted" 
    });
  } catch (error) {
    res.status(500).json({ 
      message: error.message 
    });
  }
};