import { Router } from 'express';
import { createHistory, deleteHistory, getHistories, getHistoryById, updateHistory } from '../controllers/history.controller.js';


const historyRouter = Router();

historyRouter.get('/history', getHistories);
historyRouter.get('/history/:id', getHistoryById);
historyRouter.post('/:trackingId/history', createHistory);
historyRouter.put('/history/:id', updateHistory);
historyRouter.delete('/history/:id', deleteHistory);

export default historyRouter;