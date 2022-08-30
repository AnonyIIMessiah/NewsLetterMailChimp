const bodyParser=require("body-parser");
const express=require("express");
const app=express();
const request=require("request");
const https=require("https");
//to use css we have to place it inside the static folder and use static function
app.use(express.static("Public-Folder"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
  var Name=req.body.Name;
  var Email=req.body.Email;
  var Password=req.body.Password;
  console.log(Name,Email,Password);
  const data={
    members:[
      {
      email_address: Email,
      status: "subscribed",
      merge_fields:{NAME:Name,
      PASSWORD:Password
    }}
]
  }
  var jsonData=JSON.stringify(data);
  const url="https://us14.api.mailchimp.com/3.0/lists/6ff70e0c01";
  const options={
    method:"POST",
    auth:"Anony:5ec36037385856976f8a386fba2b6c62-us14"
  }

  const request=https.request(url, options,function(response){
    if (response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
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

//to run this server in heroku server we will use
//process.env.PORT
app.listen(process.env.PORT || 3000,function(){
  console.log("running at 3000");
})


// list id
// 6ff70e0c01.
// API KEY
// 5ec36037385856976f8a386fba2b6c62-us14
