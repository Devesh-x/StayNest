import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;
  console.log("Received search query:", query);

  try {
    // Build the where clause dynamically
    const whereClause = {};
    
    if (query.city && query.city !== "") {
      whereClause.city = {
        contains: query.city,
        mode: 'insensitive'
      };
    }
    
    if (query.type && query.type !== "") {
      whereClause.type = query.type;
    }
    
    if (query.property && query.property !== "") {
      whereClause.property = query.property;
    }
    
    if (query.bedroom && query.bedroom !== "") {
      whereClause.bedroom = parseInt(query.bedroom);
    }
    
    if ((query.minPrice && query.minPrice !== "") || (query.maxPrice && query.maxPrice !== "")) {
      whereClause.price = {};
      if (query.minPrice) whereClause.price.gte = parseInt(query.minPrice);
      if (query.maxPrice) whereClause.price.lte = parseInt(query.maxPrice);
    }

    console.log("Search criteria:", whereClause);

    // If no filters are set, return all posts
    if (Object.keys(whereClause).length === 0) {
      const posts = await prisma.post.findMany({
        include: {
          user: {
            select: {
              username: true,
              avatar: true,
            },
          },
        },
      });
      console.log(`Found ${posts.length} posts (no filters)`);
      return res.status(200).json(posts);
    }

    // Otherwise, apply filters
    const posts = await prisma.post.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });
    console.log(`Found ${posts.length} posts (with filters)`);
    res.status(200).json(posts);
  } catch (err) {
    console.log("Error in getPosts:", err);
    res.status(500).json({ message: "Failed to get posts" });
  }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
          const saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
        return res.status(200).json({ ...post, isSaved: saved ? true : false });
      } catch (err) {
        // Token invalid, fall through to send isSaved: false
        }
    }
    return res.status(200).json({ ...post, isSaved: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

export const updatePost = async (req, res) => {
  try {
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update posts" });
  }
};

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({
      where: { id },
    });

    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete post" });
  }
};