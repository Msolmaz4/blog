"use strict"
/*

BLOG api project

*/
const express=require("express")
const app=express()

require('dotenv').config()
const PORT=process.env.PORT
//DB Connection
require('./src/configs/dbConnection')
/* ------------------------------------------------------- */
// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session

const session = require("cookie-session")
app.use(session({
   secret:process.env.SECRET_KEY || 'write_random_chars_in_here',
   // name:"cookie"//default req.session
   maxAge:100 * 60 *60 *24//mioseconds

}))

//filtersearchpagenation
app.use(require("./src/middlewares/findSearchSortPage"))

// JSON
app.use(express.json()) //konuma dikkat
require("express-async-errors")

app.all('/', (req,res)=>{
   // res.send('WELCOME First ExpressJs Project with Mongo')
   res.send({
    message:'WELCOME First ExpressJs Project with Mongo',
    session:req.session,
    //cookie:req.cookie
    login:req.session.email ? true : false
   })

})

// routes
app.use('/blog',require('./src/routes/blogRouter'))
app.use('/user',require('./src/routes/userRouter'))
//HOME Page



// ERROR HANDLER
app.use(require('./src/middlewares/errorHandler'))

//require("./src/sync")()



app.listen (PORT, ()=>console.log('running on http://127.0.0.1:'+PORT))