import cors from 'cors'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import http from 'http'  

dotenv.config()
connectDB()

const app = express()
const server = http.createServer(app) // Create an HTTP server with the Express app
 
 
app.use(express.json())

app.use(
  cors({
    origin: '*',
  })
)



 
// API routes
app.use('/api/user', userRoutes)
app.post('/', (req, res) => {
  console.log("working");
  res.status(200).send('Home route POST request received');
});

  

const PORT = process.env.PORT || 5000
server.listen( // Change app.listen to server.listen
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port http://localhost:${PORT}`
      
  )
)
