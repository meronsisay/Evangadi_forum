// these component used to "for big project there is MVC...the arctict folder structure module(database),view(front end or cliant),controller" found in back-end and communicate with database

         // db connection
const dbconnection = require('../db/dbConfig')

const  bcrypt = require('bcrypt')
const  {StatusCodes} = require('http-status-codes')

async function register(req,res) {
    // res.send("register")
    const {username, firstname, lastname, email,password } = req.body
    if (!username || !firstname || !lastname || !email || !password ){
        return  res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad Request",
                         msg: "please provide all required information"})
    }
    try {
        const [user] = await dbconnection.query ("SELECT username, userid FROM users WHERE username = ? or email = ?",[username,email])
        // return  res.json({user: user})
        if(user.length>0){
            return  res.status(StatusCodes.CONFLICT).json({ error: "Conflict",
                                         msg: "user already register"})
        }
        if(password.length <= 8){
            return  res.status(StatusCodes.BAD_REQUEST).json({ error: "Bad Request",
                                    msg: "password must be at least 8 characters"})                        
        }

        //   encrypt thev password
        const salt = await bcrypt.genSalt(10)
       const hashedpassword = await bcrypt.hash(password,salt) 
        await dbconnection.query("INSERT INTO users (username,firstname ,lastname,email, password)VALUES (?,?,?,?,?)" ,[username,firstname ,lastname,email,  hashedpassword] )
        return  res.status(StatusCodes.CREATED).json({  error: "Created",
            msg: "User registered successfully"})
    } catch (error) {
        console.log(error.message);
        return  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: "Internal Server Error",
                                 msg: "An unexpected error occurred."})
    }
}

async function login(req,res) {
    // res.send("login")
}

async function checkUser(req,res) {
    // res.send("check user")
}

module.exports = {register,login,checkUser}