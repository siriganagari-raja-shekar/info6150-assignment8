const express = require("express");
const validators = require("./../utils/validators");
const bcrypt = require("bcrypt");
const userService = require("./../services/userService");


const get = async (req, res, next) =>{
    const users = await userService.getAll();
    res.status(200).json(users);
};

const create = async (req, res, next) =>{
    const { email, fullname, password } = req.body;

    if( !email || !fullname || !password){
        return res.status(400).json({
            error: "Please send username, fullname and password in the request"
        });
    }
    const user = await userService.getOne(email);
    if(user){

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

    const createdUser = await userService.create({
        email: email,
        fullname: fullname,
        passwordHash: passwordHash
    });

    if(createdUser){
        return res.status(201).json(createdUser);
    }
    else{
        return res.status(501).json({
            error: "Some error has occured on the server side. Please try again later"
        });
    }

};

const update = async (req, res, next)=>{
    const { email, fullname, password } = req.body;

    if( !email){
        return res.status(400).json({
            error: "Please send email in the request for update"
        });
    }

    const user = await userService.getOne(email);

    if(!user){
        return res.status(400).json({
            error: "User with the specified email does not exist. Please check your email"
        });
    }

    var updateNeeded = false;
    
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
        const passwordMatch = await bcrypt.compare(password, user.passwordHash);
        if(!passwordMatch){
            const passwordHash = await bcrypt.hash(password, 10);
            user.passwordHash = passwordHash;
            updateNeeded = true;
        }
    }  
    if(updateNeeded){
        const updatedUser = await userService.update(user);

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
    
};

const remove = async (req, res, next) =>{
    const { email } = req.body;

    if( !email){
        return res.status(400).json({
            error: "Please send email in the request for update"
        });
    }

    const user = await userService.getOne(email);
    if(!user){
        return res.status(400).json({
            error: "User with the specified email does not exist. Please check your email"
        });
    }

    const deletedUser = await userService.remove(email);
    
    if(deletedUser){
        return res.status(204).send();
    }
    else{
        return res.status(501).json({
            error: "Some error has occured on the server side. Please try again later"
        });
    }

};

module.exports = { get, create, update, remove};