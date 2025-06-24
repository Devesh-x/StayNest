import bcrypt from 'bcrypt';
import prisma from '../lib/prisma.js';
import { response } from 'express';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
export const register = async(req, res) => {
    const { username, email, password } = req.body;

    console.log("Registration attempt:", { username, email });

    try {
        // Check if user already exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            if (existingUser.username === username) {
                console.log("Username already exists:", username);
                return res.status(400).json({ message: "Username already exists" });
            }
            if (existingUser.email === email) {
                console.log("Email already exists:", email);
                return res.status(400).json({ message: "Email already exists" });
            }
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        console.log("New user created:", newUser);

        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        console.log("Error creating user:", error);
        res.status(500).json({message: "Failed to create user"});
    }
};


export const login = async(req, res) => {
const { username, password } = req.body;

console.log("Login attempt for username:", username);

// user exist or not
try {
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if(!user) {
        console.log("User not found:", username);
        return res.status(404).json({ message: "Invalid credentials" });
    }

    console.log("User found:", user.username);

    //checkpassword

const isPasswordValid = await bcrypt.compare(password, user.password);
if(!isPasswordValid){
    console.log("Invalid password for user:", username);
    return res.status(401).json({ message: "Invalid credentials" });
}

console.log("Password valid for user:", username);

const age = 1000 * 60 * 60 * 24 * 7; // 7 days

const token = jwt.sign(
    { id: user.id, isAdmin: false },
    process.env.JWT_SECRET_KEY,
    { expiresIn: age }
)

const {password: userPassword, ...userInfo} = user; // Exclude password from the user object

// Set the token in a cookie
res.cookie("token", token, {
    httpOnly: true,
    maxAge: age,
    // secure: true, // Use true if using HTTPS
}).status(200).json(userInfo); // Send user info without password

console.log("Login successful for user:", username);
    
} catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ message: "Failed to login" });
    
}
};



export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "User logged out successfully" });
};
