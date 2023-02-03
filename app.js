
const express=require("express");
const bodyParser = require("body-parser");
const request=require("request");
const https=require("https");
 
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
})
app.post("/",function(req,res){
    const email=req.body.email;
    const fName=req.body.firstname;
    const lName=req.body.lastname;
    const data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fName,
                    LNAME:lName
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data);
    const url="https://us14.api.mailchimp.com/3.0/lists/cb20a96ee4";

    const options={
        method:"POST",
        auth:"aditya1:e81557a8ebe7cda0073d618d015f0145-us14"
}
    const request=https.request(url,options,function(response){
        if(response.statusCode==200)
            {res.sendFile(__dirname+"/sucess.html");}
        else
            {res.sendFile(__dirname+"/failure.html");}
        response.on("data",function(data){
        })
    })
    request.write(jsonData);    
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("server at 3000");
})
