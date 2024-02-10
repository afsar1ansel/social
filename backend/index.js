const express = require("express");
// const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const connectDb = require("./config/db");
const cors = require("cors")
// const useragent = require("express-useragent");
const jwt = require("jsonwebtoken");
const app = express();
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: "http://localhost:5173"}));
// app.use(useragent.express());
app.use("/users", require("./routes/register"))
app.use("/users", require("./routes/login"))
app.use("/posts", require("./routes/addPost"))

app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(8080, async() => {
    try {
        await connectDb();
        console.log("Server started on port 8000");
    } catch (error) {
        console.log(error);
    }
})

