const jwt = require("jsonwebtoken");


const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    console.log('Checking login')
    try {
        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.username = decoded.username;
        req.userid = decoded.userid;
        next()
    } catch (error) {
        next('Authentication error')
    }
}

module.exports = checkLogin;