const connectDB = require("./config/db");
require("dotenv").config();
const PORT = process.env.PORT;
const app = require("./app");

const startServer = async ()=>{
    await connectDB();
    app.listen(PORT, ()=>{
        console.log("Server is listening at the post", PORT)
    })

}

startServer();
