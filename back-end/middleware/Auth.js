import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    const {token} = req.headers;
    if (!token) {
        return res.status(401).json({success: false, message: "Unauthorized login again"});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({success: false, message: "Unauthorized login again"});
    }
}

export default authMiddleware