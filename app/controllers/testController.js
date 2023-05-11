/* TEST CONTROLLER: RENDER TEST PAGES */

/* GET '/test' - render test page */
const test = (req, res) => {
    res.render('testviews/test', { title: 'Test', user: req.user });
};

/* GET '/test/results' - render results of previous test after saving them */
const testResults = (req, res) => {
    res.render('testviews/testResults', { title: 'Results', user: req.user  });
};

/* GET 'test/error' - render error page if there was an error saving the test results */
const testError = (req, res) => {
    res.render('testviews/testError', { title: 'Results', user: req.user  });
};

module.exports = {
    test,
    testResults,
    testError
}