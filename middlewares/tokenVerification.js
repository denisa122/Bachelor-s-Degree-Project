const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.header("auth-token");

    if (!token) {
        return res.status(401).json({ error: "Access denied!" });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;

        // Pass control to the next route
        next();
    } catch (error) {
        res.status(400).json({ error: "Invalid token!" });
    }
};

module.exports = {verifyToken};