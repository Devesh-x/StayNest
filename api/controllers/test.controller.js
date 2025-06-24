import jwt from 'jsonwebtoken';
export const shouldBeLoggedIn = async (req, res) => {
    const token= req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You must be logged in to access this resource." });
    }
    
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        res.status(200).json({ message: "You are logged in." });
    } catch (error) {
        return res.status(403).json({ message: "Invalid token." });
    }
}




export const shouldBeAdmin = async(req, res) => {
       const token= req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "You must be logged in to access this resource." });
    }
    
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if(!payload.isAdmin) {
            return res.status(403).json({ message: "You do not have permission to access this resource." });
        }
        res.status(200).json({ message: "You are authorized." });
    } catch (error) {
        return res.status(403).json({ message: "Invalid token." });
    }
}
