var path = process.cwd()
var Handler = require(path + '/app/controllers/handler.server.js')
module.exports = function (app, passport) {
  var handler = new Handler();
  //sendFile

  function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
      res.redirect('/login')
		}
	}


  app.route('/')
    .get(isLoggedIn, (req,res) => {
      res.sendFile(`${path}/public/home.html`)
    })
  app.route('/in')
    .get(isLoggedIn, (req,res) => {
      res.sendFile(`${path}/public/in.html`)
    })
  app.route('/out')
    .get(isLoggedIn, (req,res) => {
      res.sendFile(`${path}/public/out.html`)
    })
  app.route('/profile')
    .get(isLoggedIn, (req,res) => {
      res.sendFile(`${path}/public/profile.html`)
    })
  app.route('/addBook')
    .get(isLoggedIn, (req,res) => {
      res.sendFile(`${path}/public/addBook.html`)
    })


  app.route('/login')
    .get((req,res) => {
      res.sendFile(`${path}/public/login.html`)
    })
  //login or logout
  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/auth/twitter', passport.authenticate('twitter'));

  app.get('/auth/twitter/callback',
    passport.authenticate('twitter', {
        successRedirect : '/',
        failureRedirect : '/login'
    }));

  //api
  app.route('/api/user')
    .post(handler.updateProfile)

  app.route('/api/book')
    .get(handler.getBooks)
    .post(handler.addBooks)

  app.route('/api/trade')
    .get(handler.addTrade)

  app.route('/api/addTrade')
    .get(handler.acceptTrade)

  app.route('/api/deleteTrade')
    .get(handler.denyTrade)
};
