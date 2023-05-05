const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const mysql2 = require("mysql2");
const cors=require("cors");
app.use(cors([
    "http://localhost:4200"
])); 
app.use(express.json());
let conn = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "pooja",
    database: "geotagging",
});
app.listen(3000);
app.get("/allemp", (request, response) => 
{
    conn.query("select *from login", (error, result) => 
    {
        response.json(result);
    });
});
app.post("/login", (req, res) => {
    console.log(req.body);
    conn.query("select *from login where email=? and password=?", [req.body.email, req.body.password], (error, result) => {
        if (result.length == 0) {
            res.json({ "error": "true", "status": "404" });
        }
        else {
            res.json({ "error": "false", "status": "200" });

        }
        // res.json(result);
    });
});
app.post("/newuser", (req, res) => {
    conn.query("insert into login (email,password,name) values (?,?,?) ", [req.body.email, req.body.password, req.name], (err, result) => {
        if (err)
            res.json({ "error": "true", "status": "404" });
        else
            res.json({ "error": "false", "status": "200" });

    });
});

// app.listen(3000);
app.get("/allcities", (request, response) => 
{
    conn.query("select *from cities", (error, result) => 
    {
        response.json(result);
    });
});