import express from 'express';
import api from './api/index.js';
import cors from 'cors';

// import {errorHandler, notFoundHandler} from './middlewares.js';

import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(
  cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  })
);
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.get('/', (req, res) => {
  console.log('serving html'),
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/v1', api);

// app.use('/uploads', express.static('uploads'));

// // Default for all routes not handled by routers above
// app.use(notFoundHandler);
// // Add error handler middleware as the last middleware in the chain
// app.use(errorHandler);
export default app;
