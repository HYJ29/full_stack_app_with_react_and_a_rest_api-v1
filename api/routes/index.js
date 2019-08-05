const express =require('express');
const bcryptjs = require('bcryptjs');
const auth = require('basic-auth');
const {check, validationResult} = require('express-validator');
const router = express.Router();
const {Course, User} = require('../models');


//authenticating middelware
const authenticateUser = async (req,res,next) =>{
  let message = null;
  const credential = auth(req);
  if(credential){
    await User.findAll().then(users=>{
      const user = users.find(user=> user.emailAddress === credential.name);
      if(user){
        const match = bcryptjs.compareSync(credential.pass,user.password);
        if(match || credential.pass === user.password){
          req.currentUser=user;
        } else {
          message = `Authentication failure with user name: ${user.emailAddress}`;
        }
      } else {
        message = `Not found with user name: ${credential.emailAddress}`;
      }
    })
  } else {
    message ='Auth Header not found';
  }
  if(message){
    console.warn(message);
    const error = new Error(message);
    error.status = 401;
    next(error);
  } else {
    next();
  }
}

//authorizing user middleware (can only access their own courses)
const authorizeUser = (req,res,next) =>{
  Course.findByPk(req.params.id)
    .then(course => {
      if(course){
        if(req.currentUser.id === course.userId){
          next();
        } else {
          const error = new Error("Not authorized to access");
          error.status = 403;
          next(error);
        }
      } else {
        const error = new Error(`there is no id:${req.params.id}`)
        error.status =404;
        next(error);
      }

    })
}


//get all the users
router.get('/users',authenticateUser,(req,res,next)=>{
  User.findByPk(req.currentUser.id,{
    order:[['createdAt','DESC']],
    include:[
      {
        model: Course,
        as:'courses',
        attributes:['id','title','description','estimatedTime','materialsNeeded']
      }
    ],
  }).then(users=>{
    if(users){
      res.status(200).json(users);
    } else {
      res.status(404).end();
    }

  }).catch(error=> next(error));
})


//post a user
//used express-validator
//to validate password confirmation fields not saving on data base and validate concisely
router.post('/users',[
  check('firstName','First name is required.')
  .exists({checkFalsy:true}),
  check('lastName','Last name is required.')
  .exists({checkFalsy:true}),
  check('emailAddress','Email address is required with valid format.')
  .exists({checkFalsy:true})
  .isEmail(),
  check('emailAddress','Email should be unique!')
  .custom(val => {
    return User.findAll({where:{emailAddress:val}}).then(user => {
      if(user.length>0) {
        return Promise.reject('Email already exist!')
      }
    });
  }),
  check('password','Password is required with length of 8~12.')
  .exists({checkFalsy:true})
  .isLength({min:8,max:12}),
  check('confirmPassword','Password confirmation is required with same letters of password.')
  .exists({checkFalsy:true})
  .custom((val,{req}) => val === req.body.password)
],(req,res,next)=>{

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    res.status(422).json({errors:errors.array({onlyFirstError:true})})
  }

  const user = req.body;
  if(user.password){
    user.password = bcryptjs.hashSync(user.password);
  }

  User.create(user).then(user=>{
    res.status(201).location('/').end();
  }).catch(error=>{
    if(error.name==="SequelizeValidationError"){
      error.status = 400;
      next(error);
    }else{
      if(error.name ==="SequelizeUniqueConstraintError"){
        error.status = 400;
        error.message = "Email already exist"
        next(error);
      }else {
        error.status = 400;
        next(error);
      }
    }
  })
})

//get all the courses
router.get('/courses',(req,res,next)=>{
  Course.findAll({
    order:[['createdAt','DESC']],
    include:[
      {
        model: User,
        as:'user',
         attributes:{exclude:['password','createdAt','updatedAt']}
      }
    ],
    attributes:{exclude:['createdAt','updatedAt']}
  }).then(function(courses){
    res.status(200).json(courses);
  }).catch(error=>next(error))
})

//get a course
router.get('/courses/:id', (req,res,next)=>{
  Course.findByPk(req.params.id,{
    include:[
      {
        model: User,
        as:'user',
        attributes:{exclude:['password','createdAt','updatedAt']}
      }
    ],
    attributes:{exclude:['createdAt','updatedAt']}
  }).then(function(course){
    if(course){
      res.status(200).json(course);
    } else {
      const error = new Error(`there is no id:${req.params.id}`)
      error.status =404;
      next(error);
    }

  }).catch(error => next(error));
})

//post new course
router.post('/courses',authenticateUser, (req,res,next)=>{
  Course.create(req.body).then(function(course){

    res.status(201).location(`/api/courses/${course.id}`).end();
  }).catch(error=>{
    if(error.name==="SequelizeValidationError"){
      error.status = 400;
      next(error);
    } else {
      next(error);
    }
  })
})

//put course
router.put('/courses/:id',authenticateUser, authorizeUser, (req,res,next)=>{
  const updatedCourse = Object.assign({
    title:null,
    description:null,
    estimatedTime:null,
    materialsNeeded:null,
    userId: null
  },req.body)
    Course.update(updatedCourse,{where:{id:req.params.id}}).then(function(){

      res.status(204).end();
    }).catch(error=>{
      if(error.name==="SequelizeValidationError"){
        error.status = 400;
        next(error);
      }else{
        next(error);
      }
    })
})

//delete course
router.delete('/courses/:id',authenticateUser, authorizeUser, (req,res)=>{
  Course.findByPk(req.params.id).then(function(course){
    course.destroy().then(function(){
      res.status(204).location(`/api/courses/${course.id}`).end();
    }).catch(error => next(error));
  })
})



module.exports = router;
