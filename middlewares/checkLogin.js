const jwt = require("jsonwebtoken");


const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decoded.username;
        req.userId = decoded.userid;
        next()
    } catch (error) {
        next('Authentication error. Please Login to continue')
    }
}

module.exports = checkLogin;