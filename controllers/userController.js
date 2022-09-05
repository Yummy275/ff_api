const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.login = (req, res) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            if (err) return res.json({ error: err.message });
            if (!user) return res.json({ error: 'Could not find user.' });
        }
        //login user
        req.login(user, { session: false }, (err) => {
            if (err) {
                return res.json({ error: err.message });
            }
            //create json web token
            const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
            res.cookie('jwt', token, { httpOnly: true });
            return res.json({ message: 'Logged in' });
        });
    })(req, res);
};
