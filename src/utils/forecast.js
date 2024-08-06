import axios from "axios";

const forecast = async(lat,long,callback) => {
    try {
        const url = `http://api.weatherstack.com/current?access_key=607e3b5876bc39b4492b1231588903e9&units=f&query=${lat},${long}`;
        const response = await axios(url);
        const data  = response.data;
        if("success" in data){
            callback("Unable to fetch weather forecat for this location. Try another search!", undefined);
        }else{
            callback(undefined,{
                temperature: data.current.temperature,
                weather_descriptions: data.current.weather_descriptions,
                feelslike: data.current.feelslike,
                location: `${data.location.name}, ${data.location.region}, ${data.location.country}`
            });
        }
    } catch (error) {
        console.log(error)
        callback("Unable to connect to waether service!", undefined);
    }
};

export default forecast;