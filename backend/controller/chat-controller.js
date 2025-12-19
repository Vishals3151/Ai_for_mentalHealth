import Chat from '../models/chat-model.js';

// Save chat messages for a user
export const saveChat = async (req, res) => {
    try {
        const { username, messages } = req.body;

        let chat = await Chat.findOne({ username });

        if (chat) {
            chat.messages.push(...messages); // append new messages
        } else {
            chat = new Chat({ username, messages });
        }

        await chat.save();
        res.status(200).json({ success: true, chat });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error saving chat" });
    }
};

// Get chat history for a user
export const getChatHistory = async (req, res) => {
    try {
        const { username } = req.params;
        const chat = await Chat.findOne({ username });
        if (!chat) return res.status(404).json({ success: false, message: "No chat found" });

        res.status(200).json({ success: true, messages: chat.messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error fetching chat history" });
    }
};
