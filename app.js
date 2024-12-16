
const express = require('express');

         // db connection
const dbconnection = require('./db/dbConfig')




const app = express();
const port = 3001


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

async function start() {
    try {
      const result = await dbconnection.execute("select 'test' ") 
    // const [result] = await dbconnection.query("SELECT 'test' AS result");

        console.log(result)
       await app.listen(port)
        console.log("database connection established")
        console.log(`listing on ${port}`)
     } catch (error) {
         console.log(error.message);
         
     }
     
}
 start() 

