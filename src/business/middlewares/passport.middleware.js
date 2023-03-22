const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcrypt');
const env = require('../../../env.config');

const UsersFactory = require('../../persistence/models/factories/users.factory');
const CartsFactory = require('../../persistence//models/factories/carts.factory');
const logger = require('../../../utils/logger.utils');

const User =  new UsersFactory();
const Cart = new CartsFactory();

const salt = () => bcrypt.genSaltSync(10);
const createHash = (password) => bcrypt.hashSync(password, salt());
const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

// Passport Local Strategy
passport.use('signup', new LocalStrategy({passReqToCallback: true}, async(req, username, password, done) => {
    try{
        const userItem = {
            email: username,
            password: createHash(password),
            name: req.body.name,
            phone: req.body.phone
        }
        if(userItem.email == env.ADMIN_EMAIL){
            userItem.rol = "admin"
        }else{
            userItem.rol = "user"
        }
        const user = await User.createUser(userItem);
        await Cart.createCart({email: userItem.email});
        logger.info('User registration successfull');
        return done(null, user);
    }catch(error){
        logger.warn('Error signing user up...');
        return done(error);
    }          
}));

passport.use('signin', new LocalStrategy(async(username, password, done) => {
    try{
        const user = await User.getUserByEmail(username);
        if(!isValidPassword(user, password)){
            logger.warn(`${user.email} -- Invalid user or password`);
            return done(null, false);
        }
        logger.info(`${user.email} has logged in`)
        return done(null, user);
    }catch(error){
        logger.warn('Error signing user in...');
        return done(error);
    } 
}));

passport.use(new JWTStrategy({
    secretOrKey: env.TOKEN_SECRET,
    jwtFromRequest: ExtractJWT.fromUrlQueryParameter(env.TOKEN_PARAMETER_NAME)
}, async(payload, done) => {
    try{
        const user = await User.getUserByEmail(payload.email);
        return done(null, user);
    }catch(error){
        return done(error);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser(async (id, done) => {
    try{
        const user = await User.getUserById(id);
        done(null, user);
    }catch(error){
        done(null, null)
    }
});

module.exports = passport;