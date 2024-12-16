// these component used to "for big project there is MVC...the arctict folder structure module(database),view(front end or cliant),controller" found in back-end and communicate with database

         // db connection
const dbconnection = require('../db/dbConfig')


async function register(req,res) {
    // res.send("register")
    const {username, firstname, lastname, email,password } = req.body
    if (!username || !firstname || !lastname || !email || !password ){
        return  res.status(400).json({msg: "please provide all required information"})
    }
    try {
        const [user] = await dbconnection.query ("SELECT username, userid FROM users WHERE username = ? or email = ?",[username,email])
        // return  res.json({user: user})
        if(user.length>0){
            return  res.status(400).json({msg: "user already register"})
        }
        if(password.length <= 8){
            return  res.status(400).json({msg: "password must be at least 8 characters"})
        }
        await dbconnection.query("INSERT INTO users (username,firstname ,lastname,email, password)VALUES (?,?,?,?,?)" ,[username,firstname ,lastname,email, password] )
        return  res.status(201).json({msg: "user created"})
    } catch (error) {
        console.log(error.message);
        return  res.status(500).json({msg: "something went wrong, try again later"})
    }
}

async function login(req,res) {
    // res.send("login")
}

async function checkUser(req,res) {
    // res.send("check user")
}

module.exports = {register,login,checkUser}