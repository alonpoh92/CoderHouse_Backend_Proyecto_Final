const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const fs = require('fs');

const logger = require('../utils/logger.utils');
const UsersDao = require('../models/daos/users/users.mongo.dao');
const { formatUserForDB } = require('../utils/users.utils');

const User =  new UsersDao();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);


// Passport Local Strategy
passport.use('signup', new LocalStrategy({passReqToCallback: true}, async(req, username, password, done) => {
    const body = req.body;
    const avatar = req.file;
    try{
        // Create Default User
        const userItem = {
            email: username,
            name: body.name,
            phone: body.countrycode+body.phone,
            address: body.address,
            age: body.age,
            avatar: "default.png",
            password: createHash(password)
        }
        const newUser = formatUserForDB(userItem);
        const user = await User.createUser(newUser);

        // Save User Avatar
        const imgName = user._id+"."+avatar.mimetype.substring(avatar.mimetype.search("/")+1);
        await fs.promises.writeFile(`./public/uploads/avatars/${imgName}`, avatar.buffer);

        // Update User Avatar
        newUser.avatar = imgName;
        await User.updateUser(user._id, newUser);

        logger.info(`User ${user.email} registration successfull`);
        return done(null, user);
   }catch(error){
        logger.error('Error signing user up...');
        return done(error.message);
   } 
}));

passport.use('signin', new LocalStrategy(async(username, password, done) => {
    try{
        const user = await User.getByEmail(username);
        if(!isValidPassword(user, password)){
            logger.warn(`Invalid user ${username} or password`);
            return done(null, false);
        }
        logger.info(`User ${username} signed in`)
        return done(null, user);
    }catch(error){
        logger.error('Error signing user in...');
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