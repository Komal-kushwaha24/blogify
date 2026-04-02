
require("dotenv").config();
const express = require("express");
const path = require("path");
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const mongoose = require("mongoose");
const cookiePaser = require('cookie-parser');
const { checkForAuthenticationCookie } = require("./middlewares/authenticatiion");
const app = express(); 
const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));
const Blog = require('./models/blog');

app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

app.use(express.urlencoded({extended:true
}));


app.use(cookiePaser());
app.use(checkForAuthenticationCookie("token"));

app.use("/user", userRoute);
app.use("/blog", blogRoute);

// server static all the images
app.use(express.static(path.resolve('./public')));
app.get("/",async (req, res) => {
    const allBlogs = await Blog.find({});
    res.render("home", {
         user: req.user,
         blogs: allBlogs,
         });
});
app.listen(PORT , ()=> console.log(`Server started at PORT : ${PORT}`));