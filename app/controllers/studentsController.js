const mongoose = require('mongoose');
const User = require('../models/users');
const StudentRel = require('../models/students');

/* GET '/educator'- render add educator page */
const educator = async (req, res) => {
    const rel = await StudentRel.findOne({student:req.user._id}).exec();
    console.log(rel);
    if (!rel) {
        res.render('students/educator', { title: "Add educator", user: req.user});
    } else {
        const educator = await User.findById(rel.educator).exec();
        console.log(educator);
        if (!educator) {
            res.render('students/educator', { title: "Add educator", user: req.user});
        } else {
            res.render('students/educator', { title: "Educator", user: req.user, educator: educator});
        }
    }
};


/* POST '/addeducator'- add an educator to a student */
const addEducator = (req, res) => {
    if (!req.body.code) {
        console.log("No code found");
        res.status(400);
        return res.redirect('/educator');
    } 
    User.findOne({ code: req.body.code })
    .exec((err, educator) => {
        console.log(educator);
        const rel = new StudentRel();
        rel.educator = educator._id;
        rel.student = req.user._id;
        rel.save((err) => {
            if (err) {
                console.log(err);
                res.status(404);
                res.redirect('/educator');
            } else {
                res.status(200);
                res.redirect('/educator');
            }
        })
    });
}

module.exports= {educator, addEducator}
