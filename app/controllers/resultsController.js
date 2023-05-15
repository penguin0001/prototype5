/* RESULTS CONTROLLER: CREATE AND RETRIEVE RESULTS */

const User = require('../models/users');

/* GET '/results' - render results page */
const results = (req, res) => {
    if (req.params.id) {
        User.findById(req.params.id)
        .exec((err, student) => {
            if (err) {
                console.log("Error finding student");
                res
                .status(400)
                .redirect('/students')
            } else if (!student) {
                console.log("User not found");
                    res
                    .status(404)
                    .redirect('/students');
            } else {
                console.log("Student found, retrieving results");
                console.log(student.results);
                res
                .status(200)
                .render('results/results', { title: "Results", results: student.results, user: req.user, student: student });
            }
        })
    } else {
        User.findById(req.user._id)
        .exec((err, user) => {
            if (err) {
                console.log("Error finding user");
                res
                .status(400)
                .redirect('/test/error')
            } else if (!user) {
                console.log("User not found");
                    res
                    .status(404)
                    .redirect('/test/error');
            } else {
                console.log("User found, retrieving results");
                console.log(user.results);
                res
                .status(200)
                .render('results/results', { title: "Results", results: user.results, user: req.user });
            }
        })
    }
}

/* POST '/results' - create a result and add it to the current users results list */
const createResult = (req, res) => {
    User.findById(req.user._id)
        .exec((err, user) => {
            if (err) {
                console.log("Error finding user");
                res
                .status(400)
                .redirect('/test/error')
            } else if (!user) {
                console.log("User not found");
                    res
                    .status(404)
                    .redirect('/test/error');
            } else {
                console.log("User found, attempting to add result");
                user.results.push({
                    date: new Date(),
                    results: req.body.results.split(',')
                });
                user.save((err) => {
                    if (err) {
                        console.log("Failed to save user");
                        res
                        .status(400)
                        .redirect('/test/error');
                    } else {
                        console.log("Successfully saved user with new result");
                        res 
                        .status(201)
                        .redirect('/test/results');
                    }
                });
            }
        });

};

module.exports = {
   results,
   createResult
}