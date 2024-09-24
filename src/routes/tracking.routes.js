import { Router } from 'express';
import { createTracking, deleteTracking, getCounterAll, getTrackingByCode, getTrackings, updateTracking } from '../controllers/tracking.controller.js';

const trackingRouter = Router();

trackingRouter.get('/', getTrackings);
trackingRouter.get('/:trackingCode', getTrackingByCode);
trackingRouter.get('/all/counter', getCounterAll);
trackingRouter.post('/', createTracking);
trackingRouter.put('/:id', updateTracking);
trackingRouter.delete('/:id', deleteTracking);

export default trackingRouter;