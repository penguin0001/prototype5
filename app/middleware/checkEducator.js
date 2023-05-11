module.exports = (req, res, next) => {
    if (req.user.userType != "Educator") {
        res.redirect('/');
    } else {
        next();
    }
};