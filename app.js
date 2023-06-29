const express=require("express");
const bodyparser=require("body-parser");
const request= require("request");
const https= require("https")

const app=express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/",function(req,res){
    const firstName= req.body.fName;
    const lastName= req.body.lName;
    const email= req.body.email;
    //var password= req.body.psswd;
    //console.log(firstName,lastName,email,password);

    const data ={
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us21.api.mailchimp.com/3.0/lists/cbbf938be6";
    const options={
        method: "POST",
        auth: "deepanshu:3532e8ceccd20fe2ad46d2f49f706ee1-us21"
    }
    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
     

})

app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("Started hosting on port 3000");
});



//3532e8ceccd20fe2ad46d2f49f706ee1-us21
// cbbf938be6