import express from "express";
import cors from "cors";

const server=express();
server.use(cors());
server.use(express.json());

const users=[];
const tweets=[];

server.post("/sign-up", (req, res)=> {
    users.push(req.body);
    res.send("OK");
});

server.post("/tweets", (req, res)=> {
    tweets.push(req.body);
    res.send("OK");
});
server.get("/tweets", (req, res)=> {
    const last10Tweets=tweets.slice(-10);
    last10Tweets.reverse();
    if (users.length===0){
        res.send([]);
        return
    }
    for (let i=0; i<last10Tweets.length; i++){
        for (let j=0; j<users.length; j++){
            if (last10Tweets[i].username===users[j].username){
                last10Tweets[i].avatar=users[j].avatar;
                break;
            }
        }
    }
    res.send(last10Tweets);
});

server.listen(5000);