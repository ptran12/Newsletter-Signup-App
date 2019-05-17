const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

    var firstName = req.body.first
    var lastName = req.body.last
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    // console.log(firstName, lastName, email);

    var options = {
        url: "https://us20.api.mailchimp.com/3.0/lists/cd049b49d2",
        method: "POST",
        headers: {
            "Authorization": "ptran12 99f2981e425eaf7e4d9d0c97c1b7e220-us20"
        },
        body: jsonData
    };

    request(options, function(error, response, body){
        if(error) {
            console.log(error);
        } else {
            console.log(response.statusCode);
        }
    });

});


app.listen(3000, function(){
    console.log("Server is running on port 3000");
});


// 99f2981e425eaf7e4d9d0c97c1b7e220-us20

// cd049b49d2