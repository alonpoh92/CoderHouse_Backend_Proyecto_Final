const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const UsersDao = require('../models/daos/users/users.mongo.dao');
const { formatUserForDB } = require('../utils/users.utils');

const User =  new UsersDao();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// Passport Local Strategy
passport.use('signup', new LocalStrategy(async(username, password, done) => {
   try{
    const userItem = {
        email: username,
        password: createHash(password)
    }
    const newUser = formatUserForDB(userItem);
    const user = await User.createUser(newUser);
    console.log('User registration successfull');
    return done(null, user);
   }catch(error){
    console.log('Error signing user up...');
    return done(error.message);
   } 
}));

passport.use('signin', new LocalStrategy(async(username, password, done) => {
    try{
     const user = await User.getByEmail(username);
     if(!isValidPassword(user, password)){
        console.log('Invalid user or password');
        return done(null, false);
     }
     return done(null, user);
    }catch(error){
     console.log('Error signing user in...');
     //return done(error.message);
     return done(null, null)
    } 
 }));

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.getById(id);
        done(null, user);
    }catch(error){
        done(error);
    }
});

module.exports = passport;