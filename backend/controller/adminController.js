import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from "../models/userModel.js"
import Journal from '../models/journalModel.js';
import Anonymous from '../models/anonymousSchema.js';
import Mood from '../models/moodSchema.js';
import Chat from '../models/chat-model.js';

// Admin Login
export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.role !== 'admin') {
            return res.status(401).json({ message: 'Access denied. Not an admin.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        const payload = { userId: user._id, role: user.role };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, message: 'Admin login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get Dashboard Statistics
export const getDashboardStats = async (req, res) => {
    try {
        const userCount = await User.countDocuments();
        const journalCount = await Journal.countDocuments();
        const anonymousPostCount = await Anonymous.countDocuments();
        const moodEntryCount = await Mood.countDocuments();

        res.status(200).json({
            users: userCount,
            journals: journalCount,
            anonymousPosts: anonymousPostCount,
            moodEntries: moodEntryCount,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude passwords
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a User
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Fetch all content (Journals, Posts, Moods, Chats)
export const getAllJournals = async (req, res) => {
    try {
        const journals = await Journal.find({}).sort({ createdAt: -1 });
        res.status(200).json(journals);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllAnonymousPosts = async (req, res) => {
    try {
        const posts = await Anonymous.find({}).sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllMoods = async (req, res) => {
    try {
        const moods = await Mood.find({}).populate('user', 'name email').sort({ date: -1 });
        res.status(200).json(moods);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

export const getAllChats = async (req, res) => {
    try {
        const chats = await Chat.find({}).sort({ updatedAt: -1 });
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Add these to your existing adminController.js

// Get a Single User by ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all activity for a single user
export const getUserActivity = async (req, res) => {
    try {
        const userId = req.params.id;
        const journals = await Journal.find({ user: userId }).sort({ createdAt: -1 });
        const moods = await Mood.find({ user: userId }).sort({ date: -1 });
        const chats = await Chat.find({ username: (await User.findById(userId)).username }).sort({ updatedAt: -1 });

        res.status(200).json({ journals, moods, chats });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};