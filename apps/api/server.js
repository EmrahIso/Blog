import express from 'express';
import 'dotenv/config';

import { adminRouter } from './routes/adminRouter.js';
import { authRouter } from './routes/authRouter.js';
import { postRouter } from './routes/postRouter.js';
import { uploadRouter } from './routes/uploadRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/posts', postRouter);
app.use('/admin', adminRouter);
app.use('/upload', uploadRouter);

app.listen(PORT, () => {
  console.log(`Api is running on port: ${PORT}`);
});
