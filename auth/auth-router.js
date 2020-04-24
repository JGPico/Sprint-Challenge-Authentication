const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Users = require('./user-model.js');

router.get("/users", (req, res) => {
  Users.find()
  .then( users => {
    res.status(200).json(users);
  })
  .catch(err => {
    res.status(500).json({error: "can't get users"});
  })
})

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 6);
  user.password = hash;

  Users.add(user)
  .then(savedUser => {
    res.status(201).json(savedUser);
  })
  .catch(err => {
    res.status(500).json({error: "Couldn't register new user"});
  });

});

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
  .first()
  .then(user => {

    if ( user && bcrypt.compareSync(password, user.password )) {
      const token = generateToken(user);
      res.status(200).json({message: "You got a token", token});
    } else {
      res.status(401).json({message: "Bad creds"});
    }
  })
  .catch(err => {
    res.status(500).json({errorMessage: "Login troubles"});
  });
});

function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username
  };
  const secret = 'secret string probably stored elsewhere';
  const options = {
    expiresIn: '10h'
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
