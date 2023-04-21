const { results, createResult } = require("../app/controllers/resultsController");
const User = require('../app/models/users');
jest.mock('../app/models/users');
  
describe('results', () => {
    let req, res, consoleSpy;
    beforeEach(() => {
        // disable console.logs for testing
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        // mock req and res objects
        req = {
            user: {},
            flash: jest.fn()
        };
        res = {
            status: jest.fn().mockReturnThis(),
            redirect: jest.fn(),
            render: jest.fn()
        };
    });

    afterEach(() => {
        consoleSpy.mockRestore();
        jest.resetAllMocks();
    });
      
    test('should redirect to /challenge/error with status code 400 if there is an error finding user', () => {
        // mock .findById(id) and .exec(err, user) with an error
        User.findById.mockImplementationOnce(() => ({
            exec: jest.fn().mockImplementation(callback => {
              callback(new Error(), null);
            })
        }));
        // call function to be tested
        results(req, res);
        // tests
        expect(User.findById).toHaveBeenCalledWith(req.user._id);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.redirect).toHaveBeenCalledWith('/challenge/error');
    });

    test('should redirect to /challenge/error with status code 404 if user is not found', () => {
        // mock .findById(id) and .exec(err, user) with no error but no user object
        User.findById.mockImplementationOnce(() => ({
            exec: jest.fn().mockImplementation(callback => {
              callback(null, null);
            })
        }));
        // call function to be tested
        results(req, res);
        // tests
        expect(User.findById).toHaveBeenCalledWith(req.user._id);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.redirect).toHaveBeenCalledWith('/challenge/error');
    });

    test('should render results/results with status code 200 if user is found', () => {
        // mock user with results
        const user = {
            results: [ "result1", "result2" ]
        };
        // mock .findById(id) and .exec(err, user) with no error and a user object
        User.findById.mockImplementationOnce(() => ({
            exec: jest.fn().mockImplementation(callback => {
              callback(null, user);
            })
        }));
        // call function to be tested
        results(req, res);
        // tests
        expect(User.findById).toHaveBeenCalledWith(req.user._id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.render).toHaveBeenCalledWith('results/results', {
            title: 'Results',
            results: user.results,
            user: req.user,
        });
    });
});

describe('createResult', () => {
    let consoleSpy, res, req;
    beforeEach(() => {
        // disable console.logs for testing
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
        // mock req and res objects
        req = {
            user: {},
            flash: jest.fn(),
            body: {
                results: "result1,result2"
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            redirect: jest.fn(),
            render: jest.fn()
        };
    });

    afterEach(() => {
        consoleSpy.mockRestore();
        jest.resetAllMocks();
    });

    test('should redirect to /challenge/error with status code 400 if error finding user', () => {
        // mock .findById(id) and .exec(err, user) with error and no user object
        User.findById.mockImplementationOnce(() => ({
            exec: jest.fn().mockImplementation(callback => {
              callback(new Error(), null);
            })
        }));
        // call function to be tested
        createResult(req, res);
        // tests
        expect(User.findById).toHaveBeenCalledWith(req.user._id);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.redirect).toHaveBeenCalledWith('/challenge/error');
    });

    test('should redirect to /challenge/error with status code 404 if user not found', () => {
        // mock .findById(id) and .exec(err, user) with no error but no user object
        User.findById.mockImplementationOnce(() => ({
            exec: jest.fn().mockImplementation(callback => {
              callback(null, null);
            })
        }));
        // call function to be tested
        createResult(req, res);
        // tests
        expect(User.findById).toHaveBeenCalledWith(req.user._id);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.redirect).toHaveBeenCalledWith('/challenge/error');
    });

    test('should redirect to /challenge/error with status code 404 if error saving user', () => {
        // mock user object
        const user = { 
            results: [ "result1" ] 
        };
        // mock .findById(id) and .exec(err, user) with error and no user object
        User.findById.mockImplementationOnce(() => ({
            exec: jest.fn().mockImplementation(callback => {
              callback(null, user);
            }),
        }));
        // mock user.save() with error
        user.save = jest.fn().mockImplementation(callback => {
            callback(new Error());
        });
        // call function to be tested
        createResult(req, res);
        // tests
        expect(User.findById).toHaveBeenCalledWith(req.user._id);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.redirect).toHaveBeenCalledWith('/challenge/error');
    });

    test('should redirect to /challenge/results with status code 201 if user succesfully saved', () => {
        // mock user object
        const user = { 
            results: [ "result1" ] 
        };
        // mock .findById(id) and .exec(err, user) with error and no user object
        User.findById.mockImplementationOnce(() => ({
            exec: jest.fn().mockImplementation(callback => {
              callback(null, user);
            }),
        }));
        // mock user.save() without error
        user.save = jest.fn().mockImplementation(callback => {
            callback(null);
          });
        // call function to be tested
        createResult(req, res);
        // tests
        expect(User.findById).toHaveBeenCalledWith(req.user._id);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.redirect).toHaveBeenCalledWith('/challenge/results');
    });
});