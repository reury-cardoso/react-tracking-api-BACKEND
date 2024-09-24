import express from 'express';
import trackingRouter from './routes/tracking.routes.js';
import historyRouter from './routes/history.routes.js';
import cors from 'cors';

const app = express();
const port = 3000;
app.use(cors())
app.use(express.json());

app.use('/', trackingRouter);
app.use('/', historyRouter)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})