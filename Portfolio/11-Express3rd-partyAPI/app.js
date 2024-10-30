const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
const API_KEY = "1b0554b21c29702c05a7b468234618a5"; 

app.use(bodyParser.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); 
});

app.post("/", (req, res) => {
  const cityName = req.body.cityName; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

  https.get(url, (response) => {
    let data = "";
    response.on("data", (chunk) => {
      data += chunk; 
    });

    response.on("end", () => {
      const weatherData = JSON.parse(data);
      if (weatherData.cod === "404") {
        return res.send(`<h2>Ciudad no encontrada. Intenta de nuevo.</h2><a href="/">Regresar</a>`);
      }
      const temperature = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;

      
      res.send(`
        <h1>Clima en ${cityName}</h1>
        <h2>Temperatura: ${temperature} °C</h2>
        <h2>Descripción: ${description}</h2>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <br>
        <a href="/">Regresar</a>
      `);
    });
  }).on("error", (err) => {
    console.error("Error en la llamada a la API: ", err);
    res.send("<h2>Error al conectarse al servicio de clima.</h2><a href='/'>Regresar</a>");
  });
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
