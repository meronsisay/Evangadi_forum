const express = require('express');

const app = express();
const port = 5500

// sample to test the server is working
// app.get(`/`, (req, res)=> {
// res.send("welcome")
// })

// user routes middleware file
const useRoutes = require("./routes/userRoute")

// user routes middleware 
app.use("/app/users", useRoutes)

// questions routes middleware ??


// answers routes middleware ??


app.listen(5500,(err)=>{
if(err) {
    console.log(err.message);
    
}else{
    console.log(`listening on ${port}`);
    
}

})