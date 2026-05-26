import express from 'express';
import 'dotenv/config';

import { authRouter } from './routes/authRouter.js';
import { postRouter } from './routes/postRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({ message: 'Server Error' });
});

app.listen(PORT, () => {
  console.log(`Api is running on port: ${PORT}`);
});

/**
 * TODO
 *
 * 1. Dokumentacija
 * 2. Confirm password
 * 3. Bolji error Handling
 * 4. Backend Testing
 */
