const mongoose = require('mongoose');
const User = require('../models/users');
const StudentLink = require('../models/students');

/* GET '/students' - render students page */
const students = async (req, res) => {
    const links = await StudentLink.find({educator:req.user._id}).exec();
    let students = [];

    // wait for all the students to be added 
    await Promise.all(links.map(async (link) => {
        const student = await User.findById(link.student).exec();
        students.push(student);
    }));

    res.render('students/students', { title: "Students", user: req.user, students: students});
}


/* POST '/students'- add a student to an educator */
const addStudent = (req, res) => {
    if (!req.body.code) {
        console.log("No code found");
        res.status(400);
        res.redirect('/students/');
    } 
    // find student via code
    User.findOne({ code: req.body.code })
            .exec((err, student) => {
                // check student doesn't already have educator
                StudentLink.findOne({student:student._id}).exec((err, link) => {
                    if (err) { 
                        res.status(400);
                        res.redirect('/students/');  
                    } else if (link) {
                        res.status(400);
                        res.redirect('/students/');
                    } else {
                        const link = new StudentLink();
                        link.educator = req.user._id;
                        link.student = student._id;
                        link.save((err) => {
                            if (err) {
                                console.log(err);
                                res.status(404);
                                res.redirect('/students/');
                            } else {
                                res.status(200);
                                res.redirect('/students/');
                            }
                        });
                    }
                });
            });
}

/* GET '/students/educator'- render add educator page */
const educator = async (req, res) => {
    const link = await StudentLink.findOne({student:req.user._id}).exec();
    if (!link) {
        res.render('students/educator', { title: "Add educator", user: req.user});
    } else {
        const educator = await User.findById(link.educator).exec();
        console.log(educator);
        if (!educator) {
            res.render('students/educator', { title: "Add educator", user: req.user});
        } else {
            res.render('students/educator', { title: "Educator", user: req.user, educator: educator});
        }
    }
};


/* POST '/students/educator'- add an educator to a student */
const addEducator = (req, res) => {
    if (!req.body.code) {
        console.log("No code found");
        res.status(400);
        res.redirect('/students/educator');
    } 

    // check student doesn't already have educator
    StudentLink.findOne({student:req.user._id}).exec((err, link) => {
        if (err) { 
            res.status(400);
            res.redirect('/students/educator');  
        } else if (link) {
            res.status(400);
           res.redirect('/students/educator');
        } else {
            // find educator via code
            User.findOne({ code: req.body.code })
            .exec((err, educator) => {
                console.log(educator);
                const link = new StudentLink();
                link.educator = educator._id;
                link.student = req.user._id;
                link.save((err) => {
                    if (err) {
                        console.log(err);
                        res.status(404);
                        res.redirect('/students/educator');
                    } else {
                        res.status(200);
                        res.redirect('/students/educator');
                    }
                })
            });
        }
    })
}

/* POST /students/remove/:id REMOVE A STUDENT/EDUCATOR LINK */
const removeStudent = (req, res) => {
    // delete
	StudentLink.deleteOne({student: req.params.id}).exec((err) => {
		if (err) {
			console.log("Error deleting link");
			res.status(400);
			res.redirect("/students")
		} else {
			console.log("Link deleted");
			res.status(200);
			res.redirect("/students");
		}
	});
}

module.exports= {educator, addEducator, students, addStudent, removeStudent}
