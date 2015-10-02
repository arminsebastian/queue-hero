var bodyParser = require('body-parser');
var cors = require('cors');


module.exports = function(app, express) {
  var authRouter = express.Router();
  var userRouter = express.Router();
  var heroRouter = express.Router();
  var requesterRouter = express.Router();

  // Middleware to parse request body
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(cors());

  // server expects url of 'auth/facebook' for facebook signin
  // authRouter to have routes for all authentications
  // i.e. facebook, github, or our own
  app.use('/auth', authRouter);

  // signup, choice, profile uses same router
  // signup make POST request
  // choice & profile both make GET request for user data
  app.use('/signup', userRouter);
  app.use('/choice', userRouter);
  app.use('/profile', userRouter);

  // all routes for hero set in heroRouter
  app.use('/hero', heroRouter);

  // all routes for requester set in requesterRouter
  app.use('/requester', requesterRouter);

  require('../auth/authRouter.js')(authRouter);
  require('../users/userRouter.js')(userRouter);
  require('../heroes/heroRouter.js')(heroRouter);
  require('../requesters/requesterRouter.js')(requesterRouter);
};