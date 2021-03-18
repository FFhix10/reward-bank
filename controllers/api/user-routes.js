const router = require('express').Router();
const { User} = require("../../models");
const withAuth = require('../../utils/auth');

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })

});

// GET one user
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'Sorry! No user was found with this id.'})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
  
});



//GET all children of a parent
router.get('/child/:id', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']},
        where: {
            admin_id: req.params.id
        }
    })
    .then(dbChildData => {
        if (!dbChildData) {
            res.status(404).json({ message: 'Sorry! No children were associated with this parent/teacher.'})
            return
        }
        res.json(dbChildData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    }) 
});


// CREATE New Admin User (Parent/Teacher)
router.post('/', (req, res) => {
    User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
  
});

//CREATE New Child User
router.post('/:id', (req,res) => {
    User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password,
        role: 'child',
        balance: req.body.balance,
        admin_id: req.params.id
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

//EDIT a user
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData[0]) {
            res.status(404).json({ message: 'Sorry! No user was found with this id.'})
            return
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
});

// DELETE a user
router.delete('/:id', withAuth, (req, res) => {
  User.destroy({
      where: {
          id: req.params.id
      }
  })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'Sorry! No user found with this id.'})
          return
      }
      res.json(dbUserData)
  })
  .catch(err => {
      console.log(err)
      res.status(500).json(err)
  })
});

router.post('/login', (req, res) => {
  
});

router.post('/logout', (req, res) => {
  
});



// DELETE /api/users/1
router.delete('/:id', withAuth, (req, res) => {
  
});

module.exports = router;