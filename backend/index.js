import express from 'express';
import { connectDB } from './db/connectDb.js';
import routes from "./routes/index.js"

const app = express();
app.use(express.json());
app.use(routes);

async function startServer() {
  try {
    await connectDB();
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Error starting server:', error);

    process.exit(1);
  }
}
startServer();