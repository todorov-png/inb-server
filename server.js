import express from 'express';
import mongoose from 'mongoose';
// import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import router from './router/index.js';
import cookieParser from 'cookie-parser';
import * as env from 'dotenv';
import errorMiddleware from './middlewares/error-middleware.js';
// import { fileURLToPath } from 'url';

env.config();
mongoose.set('strictQuery', false);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use('/api', router);
app.use(errorMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`[OK] Server is running on PORT = ${PORT}`);
    });

    mongoose
      .connect(process.env.BD_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('[OK] DB is connected'))
      .catch((err) => console.error(err));

    // app.use('/', express.static(path.join(__dirname, '../dist')));
  } catch (e) {
    console.log(e);
  }
};
start();
