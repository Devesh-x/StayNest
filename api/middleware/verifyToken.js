import jwt from 'jsonwebtoken';

export const verifyToken = async(req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You must be logged in to access this resource." });
    }
    
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = payload.id; // Attach the user id as req.userId
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token." });
    }
}

export const verifyAdmin = async(req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You must be logged in to access this resource." });
    }
    
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!payload.isAdmin) {
            return res.status(403).json({ message: "You do not have permission to access this resource." });
        }
        req.userId = payload.id; // Attach the user id as req.userId
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token." });
    }
}