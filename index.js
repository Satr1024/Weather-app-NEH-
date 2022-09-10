const express=require('express');
const https=require('https');
const hbs=require('hbs');
const path=require('path');
const bodyParser=require('body-parser');
const app=express();

app.use(express.static("public"));
hbs.registerPartials(path.join(__dirname,'templates/partials'));
app.set('views',path.join(__dirname,'templates/views'));
app.set('view engine','hbs');
app.use(bodyParser.urlencoded({extended:true}));
let arrdata=[];
let url="";
let city="gauhati";
app.get("/",function(req,res)
{
	
	
	url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a50125806c9c55f6a7582def6ba201a8&units=metric`;
	console.log(url+"\n");
	https.get(url,(response)=>
	{
		response.on("data",function(data)
		{
			let body=JSON.parse(data);
			
			console.log(body.cod);
			if(body.cod==="404")
			{
				city="gauhati";
				res.redirect("/");
			}
			else{

			city=body.name;
			let temp=body.main.temp;
			let icon=body.weather[0].icon;
			let country=body.sys.country;
			arrdata=[city,temp,icon,country];
		}
		})
		response.on("end",(err)=>
		{
			res.render("index",{Source:arrdata[2],City:arrdata[0],Temp:arrdata[1],Country:arrdata[3]});	
		})
	});

});

app.post("/",function(req,res)
{
	city=req.body.city;
	res.redirect("/");
});

app.listen(process.env.PORT || 3000,function()
{
	console.log("Server Started");
})