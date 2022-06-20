import express from "express";
import cors from "cors";

const server = express();
server.use(cors());
server.use(express.json());

const users = [];
const tweets = [];

function userPicture(user) {
    for (let j = 0; j < users.length; j++) {
        if (user === users[j].username) {
            return users[j].avatar;
        }
    }
}

server.post("/sign-up", (req, res) => {
    if (!req.body.avatar || !req.body.username) {
        res.status(400);
        res.send("Todos os campos são obrigatórios!");
        return;
    }
    users.push(req.body);
    res.status(201);
    res.send("OK");
});

server.post("/tweets", (req, res) => {
    if (!req.body.tweet || !req.body.username || !users.some(el => el.username === req.body.username)) {
        res.status(400);
        if (!users.some(el => el.username === req.body.username)) {
            res.send("Usuario inexistente");
        } else {
            res.send("Todos os campos são obrigatórios!");
        }
        return;
    }
    req.body.avatar=userPicture(req.body.username);
    tweets.push(req.body);
    res.status(201);
    res.send("OK");
});
server.get("/tweets", (req, res) => {
    const last10Tweets = tweets.slice(-10);
    last10Tweets.reverse();
    res.send(last10Tweets);
});

server.get("/tweets/:teste", (req, res) => {

    const user = req.params.teste;
    let arrUserTweets = [];

    if (!users.some(el => el.username === user)){
        res.status(400);
        res.send("Usuario inexistente");
        return;
    }


    function filterUserTweets(el) {
        if (el.username===user) {
            return true;
        }
        return false;
    }

    arrUserTweets = tweets.filter(filterUserTweets);
    arrUserTweets.reverse();

    res.send([arrUserTweets]);
});

server.listen(5000);