import express from 'express';
import routes from "./routes/index.js"
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(routes);

export default app;