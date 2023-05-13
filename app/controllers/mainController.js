/* MAIN CONTROLLER: RENDER MISCELLANEOUS PAGES */

/* GET '/'- render home page */
const home = (req, res) => {
    res.render('main/home', { title: 'Home', user: req.user });
};

/* GET '/about' - render about page */
const about = (req, res) => {
    res.render('main/about', { title: 'About', user: req.user });
};


module.exports = {
    home, 
    about,
}
