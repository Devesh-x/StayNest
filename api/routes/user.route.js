import express from 'express';
import { deleteUser, getUser, getUsers, profilePosts, savePost, updateUser, getNotificationNumber } from '../controllers/user.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router=express.Router();

router.get("/profilePost",verifyToken ,profilePosts);
router.get("/notification",verifyToken ,getNotificationNumber);
router.post("/save",verifyToken ,savePost);
router.get("/",getUsers);
router.get("/:id", verifyToken ,getUser);
router.put("/:id",verifyToken ,updateUser);
router.delete("/:id",verifyToken ,deleteUser);

export default router;