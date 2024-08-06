import axios from "axios";

const geocode = async (address, callback) => {
    const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${address}&access_token=pk.eyJ1IjoiMTExc3NodWJoYW0iLCJhIjoiY2tkbXJ1bW5sMDRiMjJ0cGF5MjNjZGs2byJ9.qjRp8KBFoJr89m6swvj5ug`;
    try{
        const response = await axios(url);
        const data  = response.data;
        if(data.features.length === 0){
            callback("Unable to find location. Try another search!", undefined);
        }
        callback(undefined,{
            location: data.features[0].properties.full_address,
            longitude: data.features[0].properties.coordinates.longitude,
            latitude: data.features[0].properties.coordinates.latitude,
        })
    }catch(e){
        callback("Unable to connect to location service!", undefined);
    }
}

export default geocode;