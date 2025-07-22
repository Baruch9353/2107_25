import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js'; 
import { addUserController, verifyController, secretController } from '../ctrl/ctrlUsers.js';

const router = express.Router();

router.post('/signup', addUserController);
router.post('/signin', verifyController);
router.get('/secret', authMiddleware(), secretController);

export default router;
