const mongoose = require('mongoose');
const User = require('../models/users');
const StudentRel = require('../models/students');

/* GET '/students' - render students page */
const students = async (req, res) => {
    const rels = await StudentRel.find({educator:req.user._id}).exec();
    let students = [];

    // wait for all the students to be added 
    await Promise.all(rels.map(async (rel) => {
        const student = await User.findById(rel.student).exec();
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
                StudentRel.findOne({student:student._id}).exec((err, rel) => {
                    if (err) { 
                        res.status(400);
                        res.redirect('/students/');  
                    } else if (rel) {
                        res.status(400);
                        res.redirect('/students/');
                    } else {
                        const rel = new StudentRel();
                        rel.educator = req.user._id;
                        rel.student = student._id;
                        rel.save((err) => {
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


/* POST '/students/educator'- add an educator to a student */
const addEducator = (req, res) => {
    if (!req.body.code) {
        console.log("No code found");
        res.status(400);
        res.redirect('/students/educator');
    } 

    // check student doesn't already have educator
    StudentRel.findOne({student:req.user._id}).exec((err, rel) => {
        if (err) { 
            res.status(400);
            res.redirect('/students/educator');  
        } else if (rel) {
            res.status(400);
           res.redirect('/students/educator');
        } else {
            // find educator via code
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
	StudentRel.deleteOne({student: req.params.id}).exec((err) => {
		if (err) {
			console.log("Error deleting rel");
			res.status(400);
			res.redirect("/students")
		} else {
			console.log("Rel deleted");
			res.status(200);
			res.redirect("/students");
		}
	});
}

module.exports= {educator, addEducator, students, addStudent, removeStudent}
