const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value => {
            if(!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email Address'});
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

//hash password before saving
userSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

//generate auth token for user
userSchema.methods.generateAuthToken = async function() {
    const user = this;
    const jwt_key = process.env.JWT_KEY || 'blashyrkhRavendark';
    const token = jwt.sign({_id: user._id}, jwt_key);
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
};

//search for a user by email and password
userSchema.statics.findByCredentials = async (userName, password) => {
    const user = await User.findOne({userName});
    if(!user) {
        return null;
    }
    const isPasswordMatch = await bcrypt.compare(password,user.password);
    if(!isPasswordMatch) {
        return null;
    }
    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
