const { challenge, challengeResults, challengeError } = require("../app/controllers/challengeController");

describe('challenge', () => {
    test('should render challenge/challenge page with title Challenge and user object', () => {
        // mock req and res objects
        const req = {
            user: {}
        };
        const res = {
            render: jest.fn()
        };
        // call function to be tested
        challenge(req, res);
        // tests
        expect(res.render).toHaveBeenCalledWith('challenge/challenge', { title: 'Test' , user: req.user });
    });
});

describe('challengeResults', () => {
    test('should render challenge/challengeResults page with title Results and user object', () => {
        // mock req and res objects
        const req = {
            user: {}
        };
        const res = {
            render: jest.fn()
        };
        // call function to be tested
        challengeResults(req, res);
        // tests
        expect(res.render).toHaveBeenCalledWith('challenge/challengeResults', { title: 'Results' , user: req.user });
    });
});

describe('challengeError', () => {
    test('should render challenge/error page with title Error and user object', () => {
        // mock req and res objects
        const req = {
            user: {}
        };
        const res = {
            render: jest.fn()
        };
        // call function to be tested
        challengeError(req, res);
        // tests
        expect(res.render).toHaveBeenCalledWith('challenge/challengeError', { title: 'Error' , user: req.user });
    });
});
