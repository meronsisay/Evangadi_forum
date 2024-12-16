// these component used to "for big project there is MVC...the arctict folder structure module(database),view(front end or cliant),controller" found in back-end and communicate with database
function register(req,res) {
    res.send("register")
}

function login(req,res) {
    res.send("login")
}

function checkUser(req,res) {
    res.send("check user")
}

module.exports = {register,login,checkUser}