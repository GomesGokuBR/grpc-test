const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const User = require('./models/User');

module.exports =  {
    async getUserbyId(call, callback) {
        const { id } = call.request;

        const user = await User.findById(id);

        return callback(null, {user: { ...user.toObject(), id: user._id}});
    },

    async registerUser(call, callback) {
        const { email, username, password } = call.request.user;

        const user = await User.create({email, username, password});

        return callback(null, {user: { ...user.toObject(), id: user._id }});
    },

    async loginUser(call, callback) {

        const { email, password } = call.request.user;

        const user = await User.findOne({ email });

        if (!user) {
            return callback(null, { error: 'User not found'});
        }

        if (!(await user.compareHash(password))) {
            return callback(null, { error: 'Invalid password'});
        }

        return callback(null, {
            token: User.generateToken(user),
        });
    },

    async authenticate(call, callback) {
        const { token } = call.request;

        if (!token) {
            return callback(null, { error: { error: 'No token provided'} });
        }

        const parts = token.split(' ');

        if (!parts.length === 2) {
            return callback(null, { error: 'Token error' });
        }

        const [schema, tokenjwt] = parts;

        if (!/^Bearer$/i.test(schema)) {
            return callback(null, { error: 'Token malformatted' });
        }

        try {

            const decoded = await promisify(jwt.verify)(tokenjwt, 'Olha essa merda');

            const user = await User.findById(decoded._id);

            return callback(null, { user: { ...user.toObject(), id: user._id } });
        } catch (error) {
            console.log(error);
            callback(null, { error: 'Token invalid' });
        }
    }
}