# StayNest - Real Estate Application

A full-stack real estate application with user authentication, property listings, chat functionality, and more.

## 🏗️ Project Structure

```
staynest/
├── api/          # Backend API (Express + Prisma + MongoDB)
├── client/       # Frontend (React + Vite)
└── socket/       # Socket.IO server for real-time chat
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd staynest

# Install API dependencies
cd api
npm install

# Install Client dependencies
cd ../client
npm install

# Install Socket dependencies
cd ../socket
npm install
```

### 2. Environment Setup

#### API Server (.env in api/ directory)
```bash
# Copy example file
cp env.example .env

# Edit .env with your values:
DATABASE_URL="your-mongodb-connection-string"
JWT_SECRET_KEY="your-super-secret-jwt-key"
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
PORT=8800
```

#### Socket Server (.env in socket/ directory)
```bash
# Copy example file
cp env.example .env

# Edit .env with your values:
FRONTEND_URL="http://localhost:5173"
NODE_ENV="development"
PORT=4000
```

#### Client (.env in client/ directory)
```bash
# Copy example file
cp env.example .env

# Edit .env with your values:
VITE_API_URL="http://localhost:8800/api"
VITE_SOCKET_URL="http://localhost:4000"
```

### 3. Database Setup

```bash
cd api

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed database
npm run seed
```

### 4. Start Development Servers

#### Terminal 1 - API Server
```bash
cd api
npm run dev
```

#### Terminal 2 - Socket Server
```bash
cd socket
npm start
```

#### Terminal 3 - Client
```bash
cd client
npm run dev
```

## 🌐 Deployment

### Render Deployment

#### API Server
1. Connect your GitHub repo to Render
2. Create a new Web Service
3. Set build command: `cd api && npm install && npx prisma generate`
4. Set start command: `cd api && npm start`
5. Add environment variables:
   - `DATABASE_URL`
   - `JWT_SECRET_KEY`
   - `CLIENT_URL` (your Vercel frontend URL)
   - `NODE_ENV=production`

#### Socket Server
1. Create another Web Service
2. Set build command: `cd socket && npm install`
3. Set start command: `cd socket && npm start`
4. Add environment variables:
   - `FRONTEND_URL` (your Vercel frontend URL)
   - `NODE_ENV=production`

### Vercel Deployment (Frontend)

1. Connect your GitHub repo to Vercel
2. Set build command: `cd client && npm install && npm run build`
3. Set output directory: `client/dist`
4. Add environment variables:
   - `VITE_API_URL` (your Render API URL)
   - `VITE_SOCKET_URL` (your Render Socket URL)

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Ensure all URLs in CORS configuration are correct
   - Check that environment variables are set properly

2. **Database Connection Issues**
   - Verify `DATABASE_URL` is correct
   - Ensure MongoDB is running and accessible

3. **Authentication Issues**
   - Check that `JWT_SECRET_KEY` is set
   - Verify cookie settings in production

4. **Socket Connection Issues**
   - Ensure `VITE_SOCKET_URL` points to correct socket server
   - Check CORS configuration on socket server

### Health Check Endpoints

- API Health: `GET /api/health`
- Socket Health: `GET /health`
- Database Test: `GET /api/test-db`

## 📝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create new post
- `GET /api/posts/:id` - Get single post
- `PUT /api/posts/:id` - Update post
- `DELETE /api/posts/:id` - Delete post

### Chat
- `GET /api/chat` - Get user chats
- `POST /api/chat` - Create new chat

### Messages
- `GET /api/message/:chatId` - Get chat messages
- `POST /api/message` - Send message

## 🛠️ Development

### Available Scripts

#### API
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm run seed` - Seed database

#### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

#### Socket
- `npm start` - Start socket server

## 📄 License

This project is licensed under the MIT License. 