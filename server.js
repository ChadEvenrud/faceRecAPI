import express from "express";
import bodyParser from "body-parser";
import { response } from "express";

const app = express();
app.use(bodyParser.json());

//Testing data
const database = {
    users: [{
            id: "123",
            name: "chad",
            email: "chadevenrid@xyz.com",
            password: "waterpolo",
            entries: 0,
            joined: new Date(),
        },
        {
            id: "124",
            name: "bree",
            email: "bree@xyz.com",
            password: "waterpolo",
            entries: 5,
            joined: new Date(),
        },
    ],
};

app.get("/", (req, res) => {
    res.send(database.users);
});

//Signing into the application response
app.post("/signin", (req, res) => {
    req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password ?
        res.json("Success!") :
        res.status(400).json("error logging in");
});

//Registering a new user

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    database.users.push({
        id: "124",
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date(),
    });
    res.json(database.users[database.users.length - 1]);
});

app.get("/profile/:id", (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(404).json("user not found");
    }
});

app.post("/image", (req, res) => {
    const { id } = req.body;
    let found = false;
    database.users.forEach((user) => {
        if (user.id === id) {
            found = true;
            entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(404).json(`${req.body.id}`);
    }
});

app.listen("3000");