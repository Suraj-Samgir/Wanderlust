// accessing the environment file...
if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
// Basic imports...
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');

// Errors, session and flash message imports...
const ExpressError = require("./utils/ExpressError.js");
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");

// Authentication imports...
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// Router imports...
const listingRouter = require('./Routes/listing.js')
const reviewsRouter = require('./Routes/reviews.js')
const userRouter = require("./Routes/user.js");

// Database url...
const dbUrl = process.env.ATLAS_DB_URL;

app.use(methodOverride('_method'));
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "/public")));
app.engine('ejs',ejsMate);

// Middleware for session store...
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24*60*60
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};


// Middlewares for sessions and flash messages...
app.use(session(sessionOptions));
app.use(flash());

// Middleware for authentication...
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


main().then(() => {
    console.log("Connected to DB!");
}).catch(()=> {
    console.log("Connection to DB Failed!");
})

async function main(){
    await mongoose.connect(dbUrl);
}

const port = 8080;

app.listen(port, () => {
    console.log("Server is listening to port 8080!");
});

// declaring the locals variables....
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})

// app.get("/demouser", async (req, res) => {
//     let fakeuser = new User({
//         email: "student@gmail.com",
//         username: "Suraj Samgir"
//     });

//     // register method used to create new user and hash their password and adding salt.
//     let registeredUser = await User.register(fakeuser, "password");
//     res.send(registeredUser);
// })

// Route for /listings
app.use("/listings",listingRouter);

// Routes for /reviews
app.use("/listings/:id/reviews",reviewsRouter);

// Routes for /user
app.use("/users",userRouter);

// for all other incomming requests ...
app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not found!"));
})

// Error Handling Middleware ....
app.use((err, req, res, next) => {
    let {statusCode=500, message="Something went wrong!"} = err;
    res.render("error.ejs", {err});
});