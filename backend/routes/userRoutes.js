import express from "express";
import {
  createUser,
  loginUser,
  logoutCurrentUser,
  getAllUsers,
  getCurrentUserProfile,
  updateCurrentUserProfile,
  deleteUserById,
  getUserById,
  updateUserById,
  getLeaderBoard,
} from "../controllers/userController.js";

import { authenticate, authorizedAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Auth & User CRUD
router.route('/').post(createUser).get(authenticate, authorizedAdmin, getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logoutCurrentUser);
router.route('/profile')
  .get(authenticate, getCurrentUserProfile)
  .put(authenticate, updateCurrentUserProfile);
router.get('/leaderboard', authenticate, getLeaderBoard);
router.route('/:id')
  .delete(authenticate, authorizedAdmin, deleteUserById)
  .get(authenticate, authorizedAdmin, getUserById)
  .put(authenticate, authorizedAdmin, updateUserById);

// ✅ New Routes for Score Tracking
router.post('/score', authenticate, async (req, res) => {
  try {
    const { score } = req.body;
    const user = req.user;

    const today = new Date().toISOString().split('T')[0]; // 'YYYY-MM-DD'

    // Check if today's score already exists
    const existingIndex = user.scoreHistory.findIndex(entry => entry.date === today);

    if (existingIndex !== -1) {
      user.scoreHistory[existingIndex].score = score; // update
    } else {
      user.scoreHistory.push({ date: today, score }); // insert
    }

    user.todaysScore = score; // optional redundancy
    await user.save();

    res.status(200).json({ message: 'Score saved successfully', score });
  } catch (error) {
    res.status(500).json({ message: 'Error saving score', error: error.message });
  }
});

router.get('/score/history', authenticate, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user.scoreHistory || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching score history', error: error.message });
  }
});

export default router;
