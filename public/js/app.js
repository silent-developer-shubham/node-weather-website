console.log("Client Side  javacript file loaded!");

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');
const message1 = document.getElementById('message-1');
const message2 = document.getElementById('message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(searchInput.value)

    message1.textContent = 'Loading...';
    message2.textContent = '';
    fetch(`http://localhost:3000/weather?address=${searchInput.value}`)
    .then((response)=>{
        return response.json()
    }).then((data)=>{
        if(data.error){
            message1.textContent = data.error;
        }else{
            const forecast = data.forecast;
            message1.textContent = data.address;
            message2.textContent = `${forecast.weather_descriptions}. It is currently ${forecast.temperature} degrees out. It feels like ${forecast.feelslike} degrees out.`;
        }
    })
    .catch((err)=>{
        console.error(err);
    });
})