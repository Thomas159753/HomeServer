import { Router } from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { createMeasurement, listMeasurement, getLatestLog, updateMeasurement, deleteMeasurement } from '../controllers/measurementControllers.js';

const measurementRouter = Router();

measurementRouter.route('/')
    .post(
        requireAuth,
        createMeasurement
    )
    .get(
        requireAuth,
        listMeasurement
    )

measurementRouter.route('/latest')
    .get(
        requireAuth,
        getLatestLog
    )

measurementRouter.route('/:id')
    .patch(
        requireAuth,
        updateMeasurement
    )
    .delete(
        requireAuth,
        deleteMeasurement
    )

export default measurementRouter;