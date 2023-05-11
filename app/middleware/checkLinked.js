const StudentLink = require('../models/students');

module.exports = (req, res, next) => {
    StudentLink.findOne({student:req.params.id}).exec((err, link) => {
        if (err) {
            console.log("Error");
            res.redirect('/students');
        } else if (!link) {
            res.redirect('/students');
        } else if (link.educator != req.user._id) {
            res.redirect('/students');
        } else {
            next();
        }
    })
};