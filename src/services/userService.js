const User = require("./../models/User");


const getOne = async (email) =>{
    const user = await User.findOne({email: email});

    return user;
}

const getAll = async () =>{
    const users = await User.find({});
    return users;
}


const create = async (user) =>{
    const newUser = new User({
        email: user.email,
        fullname: user.fullname,
        passwordHash: user.passwordHash
    });

    const updatedUser = await newUser.save();
    return updatedUser;
}

const update = async(user) =>{
    const updatedUser = await user.save();

    return updatedUser;
}

const remove = async (email) =>{
    const deletedUser = await User.deleteOne({email: email});

    return deletedUser;
}

module.exports = {
    getOne, getAll, create, update, remove
}