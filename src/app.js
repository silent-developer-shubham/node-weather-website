import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import geocode from "./utils/geocode.js";
import forecast from "./utils/forecast.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express();

app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("",(req,res)=>{
    res.render('index',{
        title:'Weather App',
        author:'Shubham Jain'
    });
});

app.get("/about",(req, res)=>{
    res.render('about',{
        title:'About Me',
        author:'Shubham Jain'
    })
});

app.get("/help",(req, res)=>{
    res.render('help',{
        title:'Help From a static file',
        author:'Shubham Jain'
    })
});

app.get("/weather",(req, res)=>{
    if(!req.query.address){
        return res.status(400).send({
            error:'Address not proided'
        })
    }
    geocode(req.query.address,(error, {latitude,longitude}= {})=>{
        if(error){
            return res.status(400).send({
                error:error,
            })
        }
        forecast(latitude, longitude, (error, {location, weather_descriptions, temperature, feelslike}={})=>{
            if(error){
                return res.status(400).send({
                    error:error,
                })
            }
            res.send({
                address: req.query.address,
                forecast: {
                    location,
                    weather_descriptions: weather_descriptions[0],
                    temperature,
                    feelslike
                },
            })
            // console.log(location);
            // console.log(`${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
            
        });
    });
    
});

app.get('/products',(req, res)=>{
    if(!req.query.search){
        return res.send({
            status:400,
            message:'You must provide search term'
        })
    }
    console.log(req.query.search);
    console.log(req.query.rating);
    res.send({
        products:[]
    })
})

app.get("*",(req,res)=>{
    res.render('404')
})

app.listen(3000,()=>{
    console.log("Server is up on port: 3000");
})

