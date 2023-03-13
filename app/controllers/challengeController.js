/* CHALLENGE CONTROLLER: RENDER CHALLENGE PAGES */

/* GET '/challenge' - render challenge page */
const challenge = (req, res) => {
    res.render('challenge/challenge', { title: 'Challenge', user: req.user });
};

/* GET '/challenge/results' - render results of previous challenge after saving them */
const challengeResults = (req, res) => {
    res.render('challenge/challengeResults', { title: 'Results', user: req.user  });
};

/* GET 'challenge/error' - render error page if there was an error saving the challenge results */
const challengeError = (req, res) => {
    res.render('challenge/challengeError', { title: 'Results', user: req.user  });
};

module.exports = {
    challenge,
    challengeResults,
    challengeError
}