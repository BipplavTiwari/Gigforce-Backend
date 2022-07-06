# LogBook
This repository contains code for backend of LogBook, where you can store your data online and access them whenever needed.

I used express framework and mongo db. All of the APIs were well tested using Postman. `/sample_Images` contains some images for reference.

## How to run the code?

 To run the code, please save this directory and modify the url of your mongo database in `/config/config.js`. Then run the following commands :
 ```
 npm install
 npm start
 ```

 The app will start running at [127.0.0.1:3000/](127.0.0.1:3000/).



## API Endpoints
A description of all the API endpoints, their URL and request parameters.

#### Signup
This is the signup API. Users register using it and their details are saved in our database.
```
url : /api/signup
method : POST
parameters = {
    "name" : "<name>",
    "email" : "<email>",
    "phoneNumber" : "<phoneNumber>",
    "address" : "<address>",
    "password" : "<password>",
    "password2" : "<confirm password>"
}
```
```
Successful : 200_OK
Unsuccessful : 400_BAD_REQUEST
```
#### Login
This is the login API. It checks if the user's credentials are valid and returns the user's name if his credentials are valid.
```
url : /api/login
method : POST
parameters = {
    "email" : "<email>",
    "password" : "<password>"
}
```
```
Successful : 200_OK 
Response = {
    "name" : "<name>"
} 
Unsuccessful : 400_BAD_REQUEST / 401_UNAUTHORIZED
```
#### Profile
This is profile API. It first checks if the user is logged in or not and fetches his details only if he is logged in.
```
url : /api/profile
method : GET
```
```
Successful : 200_OK
Response = {
    "name": "<name>",
    "email": "<email>",
    "phoneNumber": "<phoneNumber>",
    "address": "<address>"
}
Unsuccessful : 401_UNAUTHORIZED
```
#### Logout
This is the logout api which allows the users to log out.
```
url : /api/logout
method : GET
```
```
Successful : 200_OK
Unsuccessful : 401_UNAUTHORIZED
```
