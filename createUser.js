import mongoose from "mongoose"
import bcrypt from "bcryptjs"

mongoose.connect("mongodb://127.0.0.1:27017/aerosafe")

const User = mongoose.model("User",{
username:String,
password:String
})

async function createUser(){

const password = await bcrypt.hash("123456",10)

await User.create({
username:"admin",
password:password
})

console.log("User created successfully")

process.exit()

}

createUser()