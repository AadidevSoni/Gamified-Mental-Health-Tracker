import express from "express";
import {createUser,loginUser,logoutCurrentUser,getAllUsers,getCurrentUserProfile,updateCurrentUserProfile,deleteUserById,getUserById,updateUserById,
  getLeaderBoard,saveTodayScore,getScoreHistory,addExpToUser,alreadyWon
} from "../controllers/userController.js";
import { authenticate, authorizedAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

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


router.post('/score', authenticate, saveTodayScore);

router.get('/score/history', authenticate, getScoreHistory);

router.post('/add-exp', authenticate, addExpToUser);

router.post('/game/win' , authenticate, alreadyWon);

export default router;
