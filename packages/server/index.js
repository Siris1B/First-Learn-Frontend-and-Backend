import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import auth from './auth/auth.js';
import languages from './languages/languages.js';
import authMiddleware from './auth/middlewares/authMiddleware.js';
import authGoogleMiddleware from './auth/middlewares/authGoogleMiddleware.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(`/auth`, auth);
app.use('/languages', [authMiddleware], languages);

app.listen(PORT, () => console.log(PORT));
