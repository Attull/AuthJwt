import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import connectDB from "./config/connectDb.js"
import router from "./routes/userRoutes.js"

dotenv.config()

const app = express()
const port =  process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

app.use(cors())

//Database connection
connectDB(DATABASE_URL)

//JSON
app.use(express.json())

//Routes
app.use("/api",router)

app.listen(port,()=>{
    console.log(`listening to the PORT ${port}`)
})