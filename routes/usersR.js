import express from 'express';
import { addUserController } from '../ctrl/ctrlUsers.js';

const router = express.Router();

router.post('/addUser', addUserController);

export default router;


