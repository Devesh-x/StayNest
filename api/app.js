import express from 'express';
import cors from 'cors';
import postRoute from './routes/post.route.js';
import authRoute from './routes/auth.route.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import testRoute from './routes/test.route.js';
import prisma from './lib/prisma.js';
import userRoute from './routes/user.route.js';
import chatRoute from './routes/chat.route.js';
import messageRoute from './routes/message.route.js';

const app = express();

// ✅ CORS configuration
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'https://stay-nest-nu.vercel.app',
  'https://staynest-client.vercel.app',
  'https://stay-nest-git-main-devesh-xs-projects.vercel.app'
].filter(Boolean); // Removes undefined/null

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log(`❌ Blocked by CORS: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log('➡️ Request Origin:', req.headers.origin);
  console.log('➡️ Request Method:', req.method);
  console.log('➡️ Request URL:', req.url);
  next();
});

// ✅ Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chat", chatRoute);
app.use("/api/message", messageRoute);

// ✅ Test DB connection
app.get("/api/test-db", async (req, res) => {
  try {
    await prisma.$connect();
    res.json({ message: "Database connected successfully" });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ message: "Database connection failed", error: error.message });
  }
});

// ✅ Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    message: "API is running", 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ✅ Start server with dynamic port
const PORT = process.env.PORT || 8800;
console.log('Starting server...');
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✅ Database URL: ${process.env.DATABASE_URL ? 'Configured' : 'Missing'}`);
  console.log(`✅ JWT Secret: ${process.env.JWT_SECRET_KEY ? 'Configured' : 'Missing'}`);
});
