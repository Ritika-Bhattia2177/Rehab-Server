const Message = require('../models/Message');

// Create a new contact message
exports.createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message, contactMethod, urgency } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message'
      });
    }

    const newMessage = await Message.create({
      name,
      email,
      phone,
      subject,
      message,
      contactMethod: contactMethod || 'email',
      urgency: urgency || 'normal'
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: newMessage
    });
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send message. Please try again.'
    });
  }
};

// Get all messages (admin)
exports.getAllMessages = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    
    if (status && status !== 'all') {
      filter.status = status;
    }

    const messages = await Message.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch messages'
    });
  }
};

// Get message by ID (admin)
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    // Mark as read
    if (!message.isRead) {
      message.isRead = true;
      message.status = 'read';
      await message.save();
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Error fetching message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch message'
    });
  }
};

// Update message status (admin)
exports.updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status, isRead: true },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    console.error('Error updating message:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to update message'
    });
  }
};

// Delete message (admin)
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete message'
    });
  }
};
