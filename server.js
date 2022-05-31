import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import knex from "knex";
import bcrypt, { hash } from "bcrypt-nodejs";
import handleRegister from "./controllers/register.js";
import handleSignin from "./controllers/signin.js";
import userProfile from "./controllers/userProfile.js";
import handleImage from "./controllers/image.js";

const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        port: 5432,
        user: "postgres",
        password: "Murphy1679!",
        database: "smart-brain",
    },
});

db.select("*")
    .from("users")
    .then((data) => console.log(data.map((x) => x.email)));

//function to check if the user exist

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send(database.users);
});
app.post("/signin", handleSignin(db, bcrypt));
app.post("/register", handleRegister(db, bcrypt));
app.get("/profile/:id", userProfile(db));
app.put("/image", handleImage(db));

app.listen("3000");