const express=require("express");
const app=express();
app.use(express.json());
require('dotenv').config()
const {connection}=require("./config/config")
const {passport}=require("./routes/google.auth")
app.get("/",async(req,res)=>{
res.send("Hello")
})

app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
    "/auth/google/callback",
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure',
        session: false
    }),
    function (req, res) {
        let user = req.user;
        console.log(user);
        res.redirect("/") //idhar after login kidhar jaana hai uska dedo
    }
);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log(`server running at ${process.env.port} \n database connected`)
    } catch (error) {
        console.log(error.message)
    }
})