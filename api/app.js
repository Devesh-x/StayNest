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
  'https://stay-nest-nu.vercel.app'
].filter(Boolean); // Removes undefined/null

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
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

// ✅ Start server
console.log('Starting server...');
app.listen(8800, () => {
  console.log('✅ Server is running on port 8800');
});
