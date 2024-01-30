import express from 'express';
import reelRoutes from './reelRoutes.js';
import userRoutes from './userRoutes.js'

const router = express.Router();

router.use('/reels', reelRoutes);
router.use('/users', userRoutes);

export default router;