import app from "../index.js";
import { ENV_VARIABLES } from "../config/env.js";
import { connectDB } from "../db/connectDB.js"


const PORT = ENV_VARIABLES.PORT || 3000;

export async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);

    process.exit(1);
  }
}

startServer();