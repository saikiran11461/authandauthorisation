const express = require("express");
const passport = require("./configs/google_auth")
const connect = require("./configs/db");

const { register, login, newToken } = require("./controllers/auth.user.controller")
const userController = require("./controllers/user.controller");
const productController = require("./controllers/product.controller")


const app = express();

app.use(express.json());
app.post("/register", register)
app.post("/login", login)

app.use("/product", productController);

app.use("/users", userController);

passport.serializeUser(function(user, done) {

    done(null, user)
})
passport.deserializeUser(function(user, done) {

    done(null, user)
})

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['email', 'profile']
    }));

app.get('/auth/google/callback',
    passport.authenticate('google', {

        failureRedirect: '/auth/google/failure'
    }),
    (req, res) => {
        const token = newToken(req.user)
        return res.send({ user: req.user, token })
        return res.send(req.user)
    }
);


app.listen(5400, async() => {
    try {
        await connect();
    } catch (err) {
        console.error(err.message);
    }
    console.log("listening on port 4321");
});