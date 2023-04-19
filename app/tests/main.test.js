const { home, about } = require("../controllers/mainController");

describe('home', () => {
    test('should render main/home page with title Home and user object', () => {
        // mock req and res objects
        const req = {
            user: {}
        };
        const res = {
            render: jest.fn()
        };
        // call function to be tested
        home(req, res);
        // tests
        expect(res.render).toHaveBeenCalledWith('main/home', { title: 'Home' , user: req.user });
    });
});

describe('about', () => {
    test('should render main/about page with title About and user object', () => {
        // mock req and res objects
        const req = {
            user: {}
        };
        const res = {
            render: jest.fn()
        };
        // call function to be tested
        about(req, res);
        // tests
        expect(res.render).toHaveBeenCalledWith('main/about', { title: 'About' , user: req.user });
    });
});