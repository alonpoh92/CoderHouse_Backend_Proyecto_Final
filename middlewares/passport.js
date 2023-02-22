const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const fs = require('fs');

const logger = require('../utils/logger.utils');
const userController = require('../controllers/users.controller');

const { formatUserForDB } = require('../utils/formats/users.utils');

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
            phone: body.phone,
            phoneCode: body.countrycode,
            address: body.address,
            age: body.age,
            avatar: "default.png",
            password: createHash(password)
        }
        const newUser = formatUserForDB(userItem);
        const user = await userController.createUser(newUser);

        const imgName = user._id+"."+avatar.mimetype.substring(avatar.mimetype.search("/")+1);
        await fs.promises.writeFile(`./public/uploads/avatars/${imgName}`, avatar.buffer);

        // Update User Avatar
        newUser.avatar = imgName;
        await userController.updateUser(user._id, newUser);

        logger.info(`User ${user.email} registration successfull`);
        return done(null, user);
   }catch(error){
        logger.error('Error signing user up...');
        return done(null, null);
   } 
}));

passport.use('signin', new LocalStrategy(async(username, password, done) => {
    try{
        const user = await userController.getByEmail(username);
        if(!isValidPassword(user, password)){
            logger.warn(`Invalid user ${username} or password`);
            return done(null, false);
        }
        logger.info(`User ${user.email} has logged in`)
        return done(null, user);
    }catch(error){
        logger.error('Error signing user in...');
        logger.error(error.message);
        return done(null, null);
    } 
 }));

passport.serializeUser((user, done) => {
    done(null, user._id)
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await userController.getById(id);
        done(null, user);
    }catch(error){
        done(error);
    }
});

module.exports = passport;