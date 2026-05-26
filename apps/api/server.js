import express from 'express';
import 'dotenv/config';

import { authRouter } from './routes/authRouter.js';
import { postRouter } from './routes/postRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
 * 5. 404 hanlder
 * 6. Odabrati nacin authentifikacije i proslijedjivanja JWT-a
 * 7. Kad se obrise post / promjeni slika posta -> obrisati automatski sliku sa posta,
 * 8. ograniciti korisnika na 12 postova
 */
