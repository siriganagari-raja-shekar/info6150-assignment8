const express = require("express");
const User = require("./userModel").User;
const validators = require("./utils/validators");
const bcrypt = require("bcrypt");
const middleware = require("./utils/middleware");

const usersRouter = express.Router();

usersRouter.use(express.json());

usersRouter.get("/getAll", async (req, res, next) =>{
    const users = await User.find({});
    res.status(200).json(users);
});

usersRouter.post("/create", async (req, res, next) =>{
    const { email, fullname, password } = req.body;

    if( !email || !fullname || !password){
        return res.status(400).json({
            error: "Please send username, fullname and password in the request"
        });
    }
    const user = await User.find({email: email});
    if(user.length !== 0){

        return res.status(400).json({
            error: "User with the specified email already exists"
        });
    }
    const emailValidation = validators.emailValidator(email);
    if(!emailValidation.isValid){
        return res.status(400).json({
            error: emailValidation.message
        })
    }

    const fullnameValidation = validators.nameValidator(fullname);
    if(!fullnameValidation.isValid){
        return res.status(400).json({
            error: fullnameValidation.message
        })
    }

    const passwordValidation = validators.passwordValidator(password);
    if( !passwordValidation.isValid ){
        return res.status(400).json({
            error: passwordValidation.message
        })
    }
    
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = new User({
        email: email,
        fullname: fullname,
        passwordHash: passwordHash
    });

    

    const savedUser = await newUser.save();

    if(savedUser){
        return res.status(201).json(savedUser);
    }
    else{
        return res.status(501).json({
            error: "Some error has occured on the server side. Please try again later"
        });
    }

});

usersRouter.put("/edit", async (req, res, next)=>{
    const { email, fullname, password } = req.body;

    if( !email){
        return res.status(400).json({
            error: "Please send email in the request for update"
        });
    }

    const user = await User.findOne({email: email});
    var updateNeeded = false;
    if(!user){
        return res.status(400).json({
            error: "User with the specified email does not exist. Please check your email"
        });
    }
    
    if(fullname){
        const fullnameValidation = validators.nameValidator(fullname);
        if(!fullnameValidation.isValid){
            return res.status(400).json({
                error: fullnameValidation.message
            })
        }
        if(user.fullname !== fullname){
            user.fullname = fullname;
            updateNeeded = true;
        }
    }

    if(password){
        const passwordValidation = validators.passwordValidator(password);
        if( !passwordValidation.isValid ){
            return res.status(400).json({
                error: passwordValidation.message
            })
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            const passwordHash = await bcrypt.hash(password, 10);
            user.passwordHash = passwordHash;
            updateNeeded = true;
        }
    }  
    
    if(updateNeeded){
        const updatedUser = await user.save();

        if(updatedUser){
            return res.status(200).json(updatedUser);
        }
        else{
            return res.status(501).json({
                error: "Some error has occured on the server side. Please try again later"
            });
        }
    }
    else{
        return res.status(400).json({
            message: "User details are already up to date"
        });
    }
    
});

usersRouter.delete("/delete", async (req, res, next) =>{
    const { email } = req.body;

    if( !email){
        return res.status(400).json({
            error: "Please send email in the request for update"
        });
    }

    const user = await User.findOne({email: email});
    if(!user){
        return res.status(400).json({
            error: "User with the specified email does not exist. Please check your email"
        });
    }

    const deletedUser = await user.delete();
    
    if(deletedUser){
        return res.status(204).send();
    }
    else{
        return res.status(501).json({
            error: "Some error has occured on the server side. Please try again later"
        });
    }

});

module.exports = { usersRouter: usersRouter};