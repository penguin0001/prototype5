const checkAuthenticated = require('../app/middleware/checkAuthenticated');
const checkNotAuthenticated = require('../app/middleware/checkNotAuthenticated');
const checkStudent = require('../app/middleware/checkStudent');
const checkEducator = require('../app/middleware/checkEducator');

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

    test('should redirect to /auth/login if there is no user', () => {
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


describe("checkStudent", () => {
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

    test('should should redirect to / if user is not a student', () => {
        // mock req with non student user
        req = { user: { userType: "Educator" } };
        // call function to be tested
        checkStudent(req, res, next);
        // test
        expect(res.redirect).toHaveBeenCalledWith('/');
    });

    test('should call next() if user is a student', () => {
        // mock req with student user
        req = { user: { userType: "Student" }};
        // call function to be tested
        checkStudent(req, res, next);
        // test
        expect(next).toHaveBeenCalled();
    });
});

describe("checkEducator", () => {
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

    test('should should redirect to / if user is not an educator', () => {
        // mock req with non student user
        req = { user: { userType: "Student" } };
        // call function to be tested
        checkEducator(req, res, next);
        // test
        expect(res.redirect).toHaveBeenCalledWith('/');
    });

    test('should call next() if user is an educator', () => {
        // mock req with student user
        req = { user: { userType: "Educator" }};
        // call function to be tested
        checkEducator(req, res, next);
        // test
        expect(next).toHaveBeenCalled();
    });
});