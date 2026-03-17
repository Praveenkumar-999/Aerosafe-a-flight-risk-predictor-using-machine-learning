import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import mongoose from "mongoose"
import session from "express-session"
import bcrypt from "bcryptjs"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

/* SESSION */

app.use(session({
secret:"aerosafe_secret",
resave:false,
saveUninitialized:false
}))

/* DATABASE */

mongoose.connect("mongodb://127.0.0.1:27017/aerosafe")

.then(()=>console.log("MongoDB connected"))

.catch(err=>console.log(err))


/* USER MODEL */

const User = mongoose.model("User",{

username:String,
password:String

})



/* LOGIN PAGE */

app.get("/", (req,res)=>{
    res.sendFile(process.cwd()+"/public/login.html")
})

// app.get("/",(req,res)=>{
//     console.log("hai")
//     res.send("hai");
// })

/* LOGIN */

app.post("/login", async(req,res)=>{

const {username,password} = req.body

const user = await User.findOne({username})

if(!user){
return res.send("User not found")
}

const valid = await bcrypt.compare(password,user.password)

if(!valid){
return res.send("Wrong password")
}

req.session.user = user

res.redirect("/home")

})


/* HOME PAGE */

app.get("/home",(req,res)=>{

if(!req.session.user){

return res.redirect("/")
}

res.sendFile(process.cwd()+"/public/index.html")

})


/* LOGOUT */

app.get("/logout",(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            console.log(err)
        }
        res.clearCookie("connect.sid")   // 🔥 important
        res.redirect("/")
    })
})


/* WEATHER + CNN API */

app.post("/analyze", async (req,res)=>{

const {lat,lon} = req.body

const url =
`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,cloud_cover,precipitation,pressure_msl`

const weatherResponse = await fetch(url)
const weatherData = await weatherResponse.json()

const w = weatherData.current

const cnnResponse = await fetch("http://127.0.0.1:6000/predict",{

method:"POST",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

temperature:w.temperature_2m,
humidity:w.relative_humidity_2m,
wind:w.wind_speed_10m,
cloud:w.cloud_cover,
rain:w.precipitation,
pressure:w.pressure_msl

})

})

const cnnResult = await cnnResponse.json()

res.json({

weather:w,
risk:cnnResult.risk,
confidence:cnnResult.confidence

})

})


app.listen(5000,()=>{
console.log("Server running http://localhost:5000")
})