const checkAuthenticated = require('../app/middleware/checkAuthenticated');
const checkNotAuthenticated = require('../app/middleware/checkNotAuthenticated');

describe("checkAuthenticated", () => {
    // mock res and next
    let req, res, next;
    beforeEach(() => {
        res = {
            redirect: jest.fn()
        }
        next = jest.fn();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should should redirect to /auth/login if there is no user', () => {
        // mock req with no user
        req = {};
        // call function to be tested
        checkAuthenticated(req, res, next);
        // test
        expect(res.redirect).toHaveBeenCalledWith('/auth/login');
    });

    test('should call next() if there is a user', () => {
        // mock req with user
        req = { user: {} };
        // call function to be tested
        checkAuthenticated(req, res, next);
        // test
        expect(next).toHaveBeenCalled();
    });
});

describe("checkNotAuthenticated", () => {
    // mock res and next
    let req, res, next;
    beforeEach(() => {
        res = {
            redirect: jest.fn()
        }
        next = jest.fn();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    test('should should redirect to / if there is a user', () => {
        // mock req with user
        req = { user: {} };
        // call function to be tested
        checkNotAuthenticated(req, res, next);
        // test
        expect(res.redirect).toHaveBeenCalledWith('/');
    });

    test('should call next() if there is not a user', () => {
        // mock req with no user
        req = { };
        // call function to be tested
        checkNotAuthenticated(req, res, next);
        // test
        expect(next).toHaveBeenCalled();
    });
});