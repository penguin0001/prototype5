/* CHALLENGE CONTROLLER: RENDER TEST PAGES */

/* GET '/challenge' - render test page */
const challenge = (req, res) => {
    res.render('challenge/challenge', { title: 'Test', user: req.user });
};

/* GET '/challenge/results' - render results of previous test after saving them */
const challengeResults = (req, res) => {
    res.render('challenge/challengeResults', { title: 'Results', user: req.user  });
};

/* GET 'challenge/error' - render error page if there was an error saving the test results */
const challengeError = (req, res) => {
    res.render('challenge/challengeError', { title: 'Error', user: req.user  });
};

module.exports = {
    challenge,
    challengeResults,
    challengeError
}