import express from 'express';
import cors from 'cors';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
// import dotenv from 'dotenv';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import testRoute from './routes/test.route.js';
import prisma from './lib/prisma.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';


// import 'dotenv/config';

const app = express();

// CORS configuration with fallback
const corsOptions = {
    origin: function(origin, callback) {
        const allowedOrigins = [
            process.env.CLIENT_URL,
            'http://localhost:5173',
            'http://localhost:5173/'
        ].filter(Boolean); // Remove any undefined values
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json()); 
app.use(cookieParser());// Middleware to parse JSON bodies

app.use((req, res, next) => {
  console.log('Request origin:', req.headers.origin);
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);


// Test database connection
app.get("/api/test-db", async (req, res) => {
    try {
        await prisma.$connect();
        res.json({ message: "Database connected successfully" });
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ message: "Database connection failed", error: error.message });
    }
});

console.log('Starting server...');
app.listen(8800, () => {
  console.log('Server is running');
});