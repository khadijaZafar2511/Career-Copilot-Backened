import dbConnect from "./DB/index.js";
import dotenv from "dotenv"
import app from "./app.js"
dotenv.config({ pah: "./env" });

dbConnect().then(() => {

   const server= app.listen(process.env.PORT || 8000, () => {
        console.log(`App is listening at port ${process.env.PORT || 8000}`);
   })
    server.on("error", (error) => {
        console.error("Error ocurred during starting server: ", error)
    })
}).catch((err) => {
    console.error("Database conection failed !!", err)
    process.exit(1)
})


