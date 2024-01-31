import express from 'express';
import reelRoutes from './reelRoutes.js';
import userRoutes from './userRoutes.js'

const router = express.Router();

router.use('/users', userRoutes);
router.use('/reels', reelRoutes);

export default router;