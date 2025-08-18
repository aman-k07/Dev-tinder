# E3
- Create a repository
- Initialize the repository
- node_modules, package.json, package-lock.json
- Install express
- Create a server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and update scripts inside package.json
- What are dependencies
- What is the use of "-g" while npm install
- Difference between Caret and Tilde (^ vs ~)
# E4
- Initialize git
- .gitignore
- Create a remote repo on github
- push all code to remote origin
- play with route and route extension  ex. /hello, / , /hello/2
- order of the route matters a lot
- install postman app and make a workspace/collection > test API call
- Write logic to handle GET,POST,PATCH,DELETE API calls and test them on Postman
- !-------------------------------------------------------------------------
- Explore routing and use of ?, +,(),* in the routes
- use of regex in the routes /a/, /.*fly$/
- Reading the dynamic routes
- Reading the query params in the routes
# E5
- Multiple Route HAndlers - Play with the code
- next()
- next function and errors along with res.send()
- app.use("/route",rH1, rH2, rH3, rH4);
- What is a Middleware?Why do we need it?
- How express JS basically handles requests behind the scenes
- Difference between app.use and app.all
- Write a dummy auth middleware for admin
- Write a dummy auth middleware for all user routes, except /user/login
- Error Handling using app.use("/",(err,req,res,next)={});
# E6
- Create a free cluster on MongoDB Official website (Mongo Atlas)
- Install mongoose library
- Connect your application to the Database "Connection-url"/devTinder
- Call the connectDB function and connect to database before starting application on 7777
- Create a userSchema & user Model
- Create POST /signup API to add data to database
- Push some documents using API calls from Postman
- Error Handling using try,catch
# E7
- JS object vs JSON (difference)
- Add the express.json middleware to your app
- Make your signup API dynamic to recieive data from the end user 
- User.findOne with duplicate email ids, which object returned
- API- Get user by email
- API- Feed API- GET /feed -get all the users from the database 
- API- Get user by ID
- Create a delete user API
- Difference between PATCH and PUT
- API- update a user
- Explore the Mongoose Documentation for Model methods
- What are the options in a Model.findOneAndUpdate method,explore more about it
- API- Update the user with email ID
# E8
- Explore schematype options from the documentation
- add required, unique,lowercase, min, minlength, trim
- add default
- Create a custom validate function for gender
- Improve the DB schema- PUT all appropriate validations on each field in schema
- Add Timestamp to the userSchema
- Add API level validation on Patch request & Signup post api
- DATA Sanitizing - Add API validation for each field
- Install validator
- Explore validator library function and Use validator function for password, email,photoURL
- NEVER TRUST req.body
# E9
- Validate data in Signup API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user is encypted password
- Create login API
- Compare passwords and throw errors if email or password is invalid
# E10
- Install cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookie back
- Install jsonwebtoken 
- In login APi , after email and password validation , create a JWT token and send it to user in cookies 
- read the cookies inside your profile API and find the loggedIn user
- userAuth Middleware
- Add the userAuth middleware in profile API and a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days
- Create userSchema method to getJWT()
- create userSchema method to comparePassword(passwordInputByUser)
# E11
- Create tinder APIs
- Create a list all API you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read doocumentation for express.Router
- Create routes folder for managing auth,profile,request routers
- Create authRouter, profileRouter, requestRouter
- Import these routes in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot password API
- Make you validate all data in every POST, PATCH APIs
# E12
- Create connectionRequestSchema
- send Connection Request API
- Proper validation of Data
- Think about all corner cases
- $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query/
- schema.pre("save) function 
- Read more about indexes in MongoDb
- why do we need index in DB?
- What is the advantages and disadvantages of creating?
- Read this article about compound index - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES
# E13
- Write code with proper validations for POST /requests/review/:status/:requestId
- Thought process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/populate.html
- Create GET /user/requests/received with all the checks
- Create GET /user/connections
# E14
- Logic for GET /feed API
- Explore the $nin, $and, $ne and other query operators
- Pagination 

NOTES:

/feed?page=1&limit=10 => 1-10 => .skip(0) & .limit(10) 

/feed?page=2&limit=10 => 11-20 => .skip(10) & .limit(10)

/feed?page=3&limit=10 => 21-30 => .skip(20) & .limit(10)

/feed?page=4&limit=10 => 31-40 => .skip(30) & .limit(10)  

skip=(page-1)*limit;