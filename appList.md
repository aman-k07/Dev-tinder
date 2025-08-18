# DevTinder API

## authRouter
 - POST /signup
 - POST /login
 - POST /logout

## profileRouter
 - GET    /profile/view
 - PATCH  /profile/edit
 - PATCH  /profile/password //Forgot Password API

## connectionRequestRouter
 - POST /request/send/Interested/:userId              POST /request/send/:status/:userId 
 - POST /request/send/Ignored/:userId                (dynamic status -> either interested/ignored)

 - POST /request/review/accepted/:requestId           POST /request/review/accepted/:requestId
 - POST request/review/rejected/:requestId

## userRouter
 - GET   /user/requests/received
 - GET   /user/connections
 - GET   /user/feed -Gets you the profile of other users on platform


Status: ignore, interested, accepted, rejected  