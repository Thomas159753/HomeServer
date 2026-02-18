import { Router } from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';

const measurementRouter = Router();

measurementRouter.route('/')
    .post(
        requireAuth,

    )

export default measurementRouter;