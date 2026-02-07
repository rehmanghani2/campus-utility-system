import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectD from './config/db.js'
import errorHandler from './middleware/errorMiddleware.js'
import authRouter from './routes/authRoutes.js'
import requestRouter from './routes/requestRoutes.js'
import adminRouter from './routes/adminRoutes.js'

// Load env vars
dotenv.config()

// Connect to database
connectD()

const app = express();

// Body parser
app.use(express.json())

// Enable CORS
app.use(cors({
    origin: [
        'http://localhost:3000',
        'https://campus-utility-system-backend.vercel.app/'
    ],
    credentials: true
}));

// Mount Routers
app.use("/", (req, res) => res.send("server is live"))
app.use('/api/auth', authRouter)
app.use('/api/requests', requestRouter)
app.use('/api/admin', adminRouter)

// Welcome route
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Campus Utility Mangement API',
        version: '1.0.0',
        endpoints: {
            auth: '/api/auth',
            requests: '/api/requests',
            admin: '/api/admin'
        }
    })
})
// Error handler middleware
app.use(errorHandler);

// handle 404
// app.use('/*', (req, res) => {
app.use( (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})



if(process.env.NODE_ENV !== "production") {
   const PORT= process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
        ╔════════════════════════════════════════════╗
        ║   Campus Utility Management API Server     ║
        ║   Running on port ${PORT}                  ║
        ║   http://localhost:${PORT}                 ║
        ╚════════════════════════════════════════════╝
        `)
})
}

export default app;