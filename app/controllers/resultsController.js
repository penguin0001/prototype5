/* RESULTS CONTROLLER: CREATE AND RETRIEVE RESULTS */

const mongoose = require('mongoose');
const User = mongoose.model("User");

/* GET '/results' - get results for current user and render */
const results = (req, res) => {
    User.findById(req.user._id)
        .exec((err, user) => {
            if (err) {
                console.log("Error finding user");
                res
                .status(400)
                .redirect('/challenge/error')
            } else if (!user) {
                console.log("User not found");
                    res
                    .status(404)
                    .redirect('/challenge/error');
            } else {
                console.log("User found, retrieving results");
                console.log(user.results);
                res
                .status(200)
                .render('results/results', { title: "Results", results: user.results, user: req.user });
            }
        })
};

/* POST '/results' - create a result and add it to the current users results list */
const createResult = (req, res) => {
    console.log(req.user);
    User.findById(req.user._id)
        .exec((err, user) => {
            if (err) {
                console.log("Error finding user");
                res
                .status(400)
                .redirect('/challenge/error')
            } else if (!user) {
                console.log("User not found");
                    res
                    .status(404)
                    .redirect('/challenge/error');
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
                        .status(404)
                        .redirect('/challenge/error');
                    } else {
                        console.log("Successfully saved user with new result");
                        res 
                        .status(201)
                        .redirect('/challenge/results');
                    }
                });
            }
        });

};

module.exports = {
   results,
   createResult
}