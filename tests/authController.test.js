const { renderLogin, renderRegister, account, register, login, logout } = require("../app/controllers/authController");
const User = require('../app/models/users');
const passport = require('passport');
jest.mock('passport');
jest.mock('../app/models/users');

describe('renderRegister', () => {
    test('should render auth/register page with title Register', () => {
        // mock req and res objects
        const req = {};
        const res = {
            render: jest.fn()
        };
        // call function to be tested
        renderRegister(req, res);
        // tests
        expect(res.render).toHaveBeenCalledWith('auth/register', { title: 'Register' });
    });
});

describe('renderLogin', () => {
    test('should render auth/login page with title Login', () => {
        // mock req and res objects
        const req = {};
        const res = {
            render: jest.fn()
        };
        // call function to be tested
        renderLogin(req, res);
        // tests
        expect(res.render).toHaveBeenCalledWith('auth/login', { title: 'Login' });
    });
});

describe('account', () => {
    test('should render auth/account page with title Account and user object', () => {
        // mock req and res objects
        const req = {
            user: {}
        };
        const res = {
            render: jest.fn()
        };
        // call function to be tested
        account(req, res);
        // tests
        expect(res.render).toHaveBeenCalledWith('auth/account', { title: 'Account', user: req.user });
    });
});

describe('register', () => {
  let req, res;
  let consoleSpy;

  beforeEach(() => {
    // disable console.logs for testing
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    // mock req and res objects
    req = {
      body: {
        name: 'Example',
        email: 'example@example.com',
        password: 'example',
        userType: 'Student'
      },
      flash: jest.fn()
    };
    res = {
      status: jest.fn().mockReturnThis(),
      redirect: jest.fn()
    };
  });

  afterEach(() => {
    consoleSpy.mockRestore();
    jest.resetAllMocks();
  });

  test('should redirect to /auth/register with a 400 status code if any required fields are missing', () => {
    // change one of the fields to be missing
    req.body.name = '';
    // call function to be tested
    register(req, res);
    // check for correct behaviour
    expect(req.flash).toHaveBeenCalledWith('error', 'All fields required');
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.redirect).toHaveBeenCalledWith('/auth/register');
  });

  test('should redirect to /auth/register with a 404 status code if user already exists', () => {
    // mock User model
    User.mockImplementation(() => ({
      save: jest.fn().mockImplementation((callback) => {
        callback(new Error());
      }),
      setPassword: jest.fn().mockImplementation()
    }));
    // call function to be tested
    register(req, res);
    // check for correct behaviour
    expect(req.flash).toHaveBeenCalledWith('error', 'There was an error. That user may already exist.');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.redirect).toHaveBeenCalledWith('/auth/register');
  });

  test('should redirect to / with a 200 status code if user is successfully registered', () => {
    // mock User model
    User.mockImplementation(() => ({
      save: jest.fn().mockImplementation((callback) => {
        callback(null);
      }),
      setPassword: jest.fn().mockImplementation()
    }));
    // call function to be tested
    register(req, res);
    // check for correct behaviour
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.redirect).toHaveBeenCalledWith('/');
  });
});

describe('logout', () => {
  // mock req, res and next
  let req, res, next;
  beforeEach(() => {
    res = {
      redirect: jest.fn(),
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('should redirect to "/" when logout succeeds', () => {
    // mock req with no error
    req = {
      logout: jest.fn((callback) => callback(null)),
    };
    // call function to be tested
    logout(req, res, next);
    // tests
    expect(req.logout).toHaveBeenCalled();
    expect(res.redirect).toHaveBeenCalledWith('/');
    expect(next).not.toHaveBeenCalled();
  });
  
  test('should call next with an error when logout fails', () => {
    // mock req with error
    const error = new Error('Logout failed');
    req = {
      logout: jest.fn((callback) => callback(error)),
    };
    // call function to be tested
    logout(req, res, next);
    // tests
    expect(req.logout).toHaveBeenCalled();
    expect(res.redirect).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});