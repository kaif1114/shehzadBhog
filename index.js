import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log("Listening on port 3000");
});
app.get("/", (req, res) =>{
    res.render("index.ejs")
});
app.post("/submit", async (req, res) => {
    try{
        const response = await axios.get("https://icanhazdadjoke.com/search?term=" + req.body.value, {
            headers: {
                Accept: 'application/json',
            },
        });
        let data = JSON.stringify(response.data);
        if(response.data.results.length != 0){
            let randomNum = Math.floor(Math.random() * response.data.results.length)
            let Joke = response.data.results[randomNum].joke;
            res.render("index.ejs", {
                bhogg: Joke,
            });
        }
        else{
            res.render("index.ejs", {
                bhogg: "No Bhog Found Matching Your Term, Please Try Again With A Different Word Instead",
            });
        }
        
    }
    catch(error){
        console.log(error);
    }
    
});