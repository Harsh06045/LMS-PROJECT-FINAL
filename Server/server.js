import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './configs/mongodb.js'
import { clerkWebhooks } from './controllers/webhooks.js'
import educatorRouter from './routes/educatorRouters.js'
import { clerkMiddleware } from '@clerk/express'
import { clerkClient } from '@clerk/express';
import connectCloudinary from './configs/cloudinary.js'

const app = express()

// Test routes will be defined after app creation

console.log('Starting server initialization...')

//DATABASE
try {
  console.log('Connecting to database...')
  await connectDB()
  console.log('Connecting to cloudinary...')
  await connectCloudinary()
  console.log('Services connected successfully')
} catch (error) {
  console.log('Some services failed to connect, but server will continue running:', error.message)
}

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => res.send("API Working"))
app.get('/health', (req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }))
app.post('/clerk', express.json(), clerkWebhooks)
app.use('/api/educator', express.json(), educatorRouter)

// Test routes for Postman testing
app.get('/api/test-get', (req, res) => {
  res.json({ 
    success: true, 
    message: 'GET request successful',
    method: 'GET',
    timestamp: new Date().toISOString()
  });
});

app.post('/api/test-post', (req, res) => {
  const { data } = req.body;
  res.json({ 
    success: true, 
    message: 'POST request successful',
    method: 'POST',
    receivedData: data,
    timestamp: new Date().toISOString()
  });
});

app.get('/api/test-query', (req, res) => {
  const { name, age } = req.query;
  res.json({ 
    success: true, 
    message: 'Query parameters received',
    queryParams: { name, age },
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

// Port
const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})