import express from 'express';
import { addUserController, verifyController } from '../ctrl/ctrlUsers.js';

const router = express.Router();

router.post('/addUser', addUserController);
router.post('/verify', verifyController);

export default router;


