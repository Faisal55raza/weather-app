const express=require("express");
const https=require("https");
const bodyparser=require("body-parser")
const app = express();

app.use(bodyparser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
});
app.post("/",function(req,res){
    var city=req.body.n;
const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=bfb6efbb79014d159965e4398638b5ad";
https.get(url,function(response){

    console.log(response.statusCode);
    response.on("data",function(data){
       const weatherdata= JSON.parse(data);
       var temp=Number(weatherdata.main.temp);
       const tempa= temp-273;
       const imageurl= "https://openweathermap.org/img/wn/"+weatherdata.weather[0].icon +"@2x.png";
      
       res.write("<h1>The tenperature of "+city+" is " + tempa+ "</h1>");
       res.write("<img src="+imageurl+">");
       res.send();
       
    })
})
});
















app.listen(3000,function(){
    console.log("Sever is running at port 3000");
});