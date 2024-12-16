const mysql2 = require('mysql2');

const dbconnection = mysql2.createPool({
    user:"Evangadi-admin", 
    database:"evangadi-forum",
    host:"localhost",
    password:"123456",
    connectionLimit: 10
})


// when we insert data for  register,answer,question....will happen call backheal so we should turn to PROMISE
dbconnection.execute( "select 'test' ", (err,result)=> {

    if(err) {
        console.log(err.message);
    }else{
        console.log(result);

    }
})

module.exports = dbconnection.promise