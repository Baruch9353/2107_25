import express from 'express';
import { addUserController, verifyController } from '../ctrl/ctrlUsers.js';

const router = express.Router();

router.post('/signup', addUserController);
router.post('/signin', verifyController);

export default router;


