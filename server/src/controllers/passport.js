const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { user: User } = require('../db/models');

passport.serializeUser((user, done) => {
    const { id } = user;
    done(null, { id });
});

passport.deserializeUser((id, done) => {
    done(null, id);
});

const strategyConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
}

const googleVerifyFunction = async (accessToken, refreshToken, profile, callback) => {
    try {
        const {
            sub: authId,
            name: displayName,
            given_name: firstName,
            family_name: lastName,
            email
        } = profile._json;

        const [ user ] = await User.findOrCreate({
            where: {
                authId
            },
            defaults: {
                authId,
                displayName,
                firstName,
                lastName,
                email
            }
        });
    
        return callback(null, user.dataValues);
    } catch (error) {
        return callback(error, null);
    }
};

passport.use(new GoogleStrategy(strategyConfig, googleVerifyFunction));

module.exports = passport;
