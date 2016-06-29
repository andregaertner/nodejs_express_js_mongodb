var express = require('express');
var router = express.Router();
var User = require('../model/user');


var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({extended: true}))
router.use(methodOverride(function(req, res){
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * @function router.users
 * @description show all users
 */
router.get('/users', function(req, res, next){

  User.find({}, function(err, docs){
      if(err){
        res.send(err);
      }else{
        //res.json(docs);
        res.render('users', {title: 'Users List', users: docs} );
      }

  });

  // res.render('users', {title: 'Users'});
});


/**
 * @function router.new
 * @description route form create user
 * @param id
 */
router.get('/new', function(req, res, next){
  res.render('new', {title: 'New User' });
});

/**
 * @function router.create
 * @description save create user
 */
router.post('/create', function(req, res){
  new User({name:req.body.name ,
            email:req.body.email,
            age:req.body.age}).save(function(err, saveduser){
    if(err){
      res.send(err);
    }else{
      res.redirect('/'+saveduser.id);
      console.log('User created successfully.');
    }
  });
});

/**
 * @function edit
 * @description edit user route
 * @param id
 * @return edi view, title, user
 */
  router.get('/:id/edit', function(req, res){
  User.findById(req.params.id, function(err, doc){
    if(err){
      res.send(err);
    }else{
      res.render('edit', {title: 'Edit User', user:doc});
      //res.json(doc);
    }
  });
});

/**
 * @function router.put
 * @description update user
 * @param id
 */
router.put('/update/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err){
      res.send(err);
    }else{
      user.name=req.body.name;
      user.email=req.body.email;
      user.age=req.body.age;
      user.save(function(err, saveduser){
        if(err){
          res.send(err);
        }else{
          res.redirect('/'+saveduser.id);
          console.log('User updated successfully.');
        }
      });
    }
  });
});

/**
 * @function router.delete
 * @description delete user route
 * @param id
 */
router.delete('/:id/delete', function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err){
      res.send(err);
    }else{
      user.remove(function(err){
        if(err){
          res.send(err);
        }else{
          res.redirect('/users');
          console.log('Item deleted successfully.');
        }
      });
    }
  });
});

/**
 * @function router.get
 * @description about route
 * @return render view, title, name, email
 */
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About us', name: 'Andre Gärtner', email: 'info@andregaertner.com' });
});

/**
 * @function route.show
 * @description show user
 * @return view show user
 */
router.get('/:id', function(req, res){
  User.findById(req.params.id, function(err, doc){
    if(err){
      res.send(err);
    }else{
      //res.json(doc);
      res.render('show', {title: 'Show User Data', user:doc});
    }
  });
});

/**
 * @route all
 */
router.all(function(req, res){
  res.send('Unknown request...');
});


module.exports = router;
