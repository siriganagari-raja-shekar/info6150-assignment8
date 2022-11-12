const e = require("express");

const emailValidator = (email) =>{
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const validation = {
        isValid: false,
        message: ""
    }

    if(emailRegex.test(email)){
        validation.isValid = true;
        validation.message = "Valid email";
    }
    else{
        validation.message = "Email does not confirm to the following pattern: username@domain Ex: rajashekar435@gmail.com"
    }

    return validation;
}

const regexSearchMatches = (regex, textToSearch) =>{
    const matches = regex.exec(textToSearch);
    if(matches !== null)
        return matches.length;
    else
        return 0;
}


const passwordValidator = (password) =>{
    const validation = {
        isValid : false,
        message: ""
    }

    if(password.trim().length === 0){
        validation.message = "Password cannot be blank";
    }
    else if(password.length < 6 ){
        validation.message = "Password must be atleast 6 characters in length";
    }
    else if(
        regexSearchMatches(/[\d]/,password) == 0 
            || regexSearchMatches(/[a-zA-Z]/,password) == 0 
            || regexSearchMatches(/[^\w]/, password) == 0
        ){

        validation.message = "Password must contain atleast one letter, one number and one special character and must be of 6 characters in length";
    }
    else{
        validation.isValid = true;
        validation.message = "Passoword validation successful";
    }
    return validation;
}

const nameValidator = (name) =>{
    const validation = {
        isValid : false,
        message: ""
    }

    const nameRegex = /^[a-zA-Z]{2,} [a-zA-Z]{2,}$/;

    if(!nameRegex.test(name.trim())){
        validation.message = "Name must be in the format: FirstName LastName Ex: John Doe";
    }
    else{
        validation.isValid = true;
        validation.message = "Name succesfully validated";
    }

    return validation;
}

module.exports = {
    passwordValidator: passwordValidator,
    emailValidator: emailValidator,
    nameValidator: nameValidator
}