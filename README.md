# info6150-assignment8
## Express server for user accounts

This is a express server integrated with mongoose to create an API for user registration and login

There are 4 API endpoints for this current server:

1. GET: /user/getAll - Gets all the user info stored in the database
2. POST: /user/create - Used to create a user. Accepts an object containing email, username and password in the header
3. PUT: /user/edit - Editing a user based on email id. Only username and password can be edit. Email is fixed after creation
4. DELETE: /user/delete - Deleting a specific user based on the email id.

## Features

1. Validation has been added to email, username and password. The specific validations must pass or an error message is returned.
2. Password is encrypted using bcrypt. So the plain password is never stored in the database.
3. Email must be unique. An attempt to create an account with another email will return an error message.
