import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
    username: { type: String, required: true }, // associate chat with user
    messages: [
        {
            sender: { type: String, enum: ['user', 'ai'], required: true },
            text: { type: String, required: true },
            timestamp: { type: Date, default: Date.now }
        }
    ],
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);
export default Chat;
