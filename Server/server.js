import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/mongodb.js';
import { clerkWebhooks } from './controllers/webhooks.js';
import educatorRouter from './routes/educatorRoutes.js';
import { clerkMiddleware } from '@clerk/express';

const app = express();

async function startServer() {
  try {
    await connectDB();

    // Middlewares
    app.use(cors());
    app.use(clerkMiddleware());

    // Routes
    app.get('/', (req, res) => res.send("API Working"));
    app.post('/clerk', express.raw({ type: 'application/json' }), clerkWebhooks);
    app.use('/api/educator', express.json(), educatorRouter);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1); // Exit with failure
  }
}

startServer();
