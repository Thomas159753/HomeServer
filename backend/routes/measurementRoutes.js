import { Router } from 'express';
import { requireAuth } from '../middlewares/authMiddleware.js';
import { createMeasurement, listMeasurement, getLatestLog, updateMeasurement, deleteMeasurement } from '../controllers/measurementControllers.js';
import { dataParamValidation, dataValidation, handlePatchError } from '../middlewares/validators/measurement.js';

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
        dataParamValidation,
        dataValidation,
        handlePatchError,
        updateMeasurement
    )
    .delete(
        requireAuth,
        dataParamValidation,
        handlePatchError,
        deleteMeasurement
    )

export default measurementRouter;