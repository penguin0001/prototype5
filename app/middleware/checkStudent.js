module.exports = (req, res, next) => {
    if (req.user.userType != "Student") {
        res.redirect('/');
    } else {
        next();
    }
};