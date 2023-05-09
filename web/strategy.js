const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const User = require('./models/user')

const link = "mongodb+srv://aman4814be:abcdef123@cluster0.stg8k1w.mongodb.net/individual"
mongoose.connect(link, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(console.log("Connected to mongodb"));
  

exports.initializingPassport = (passport) => {

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        console.log(email, password);
        try{
            const user = await User.findOne({email});
            if(!user) return done(null, false);
            console.log("Email found");
            if(user.password !== password) return done(null, false);
            console.log("Password validated");
            return done(null, user);
        } catch(error){
            return done(error, false);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findById(id);
            done(null, user);
        } catch(error) {
            done(error, false); 
        }
    })
}

exports.isAuthenticated = (req, res, next) => {
    if (req.user) return next();
    re.redirect("/login");
}